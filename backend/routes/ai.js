const express = require('express');
const router = express.Router();
const { openai } = require('../aiClient');
const auth = require('../middleware/auth');
const { enrichItineraryWithImages } = require('../services/unsplash');
const {
  SYSTEM_PROMPT,
  buildCreatePrompt,
  buildEditPrompt,
  extractJson,
} = require('../prompts/trip-planner');

const GEOAPIFY_API_KEY = process.env.GEOAPIFY_API_KEY;


const AI_MODEL = process.env.AI_MODEL || 'qwen-flash';

// Map vibe -> style (relaxed / balanced / packed)
const VIBE_TO_STYLE = {
  chill: 'relaxed',
  beach: 'relaxed',
  adventure: 'packed',
  nightlife: 'packed',
  culture: 'balanced',
  foodie: 'balanced',
};

// Simple mapping type -> Geoapify categories cho AI gợi ý địa điểm
function getGeoapifyCategoriesForType(type) {
  const t = (type || '').toLowerCase();
  if (t === 'hotel' || t === 'lodging') {
    return 'accommodation.hotel,accommodation.motel,accommodation.guest_house';
  }
  if (t === 'food' || t.includes('restaurant')) {
    return 'catering.restaurant';
  }
  if (t === 'cafe') {
    return 'catering.cafe';
  }
  if (t === 'entertainment' || t === 'nightlife' || t === 'bar') {
    return 'entertainment,entertainment.culture,catering.bar';
  }
  if (t === 'sightseeing' || t === 'attraction') {
    return 'tourism.attraction,entertainment.culture';
  }
  if (t === 'nature' || t.includes('park')) {
    return 'leisure.park,natural';
  }
  if (t === 'shopping') {
    return 'commercial.shopping_mall,commercial';
  }
  return 'catering,entertainment,accommodation,tourism,commercial';
}

/**
 * POST /api/ai/plan-trip
 * Tạo lịch trình du lịch với AI (JSON structure)
 * Body: { destination, startDate, endDate, vibe?, budget?, travelers?, notes? }
 */
router.post('/plan-trip', auth, async (req, res) => {
  try {
    const { destination, startDate, endDate, vibe, budget = 'medium', travelers = 1, notes, language = 'vi' } = req.body;

    if (!destination || !startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: 'Thiếu thông tin: destination, startDate, endDate là bắt buộc',
      });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1);

    const style = VIBE_TO_STYLE[vibe] || 'balanced';
    const budgetLevel = ['low', 'medium', 'high'].includes(budget) ? budget : 'medium';

    const preferences = [notes, travelers > 1 ? `Số người: ${travelers}` : ''].filter(Boolean).join('. ');

    let userPrompt = buildCreatePrompt(destination, days, budgetLevel, style, preferences);
    if (language === 'en') {
      userPrompt += '\n\nIMPORTANT: Viết toàn bộ mô tả, tiêu đề, nội dung hành trình bằng TIẾNG ANH.';
    } else {
      userPrompt += '\n\nLƯU Ý: Viết toàn bộ mô tả, tiêu đề, nội dung hành trình bằng tiếng VIỆT.';
    }

    const completion = await openai.chat.completions.create({
      model: AI_MODEL,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userPrompt },
      ],
    });

    const rawContent = completion.choices?.[0]?.message?.content ?? '';
    const itinerary = extractJson(rawContent);

    if (!itinerary) {
      return res.status(500).json({
        success: false,
        message: 'AI không trả về JSON hợp lệ',
        raw: rawContent.substring(0, 500),
      });
    }

    const enrichedItinerary = await enrichItineraryWithImages(itinerary, destination);

    res.json({
      success: true,
      itinerary: enrichedItinerary,
      destination,
      startDate,
      endDate,
      days,
    });
  } catch (err) {
    console.error('AI plan-trip error:', err);
    const msg = err.message || String(err);
    const isModelError = /model|invalid|not found|404/i.test(msg);
    res.status(500).json({
      success: false,
      message: isModelError ? 'Model AI không khả dụng. Kiểm tra DASHSCOPE_API_KEY và AI_MODEL trong .env' : 'Lỗi khi tạo kế hoạch',
      detail: msg,
    });
  }
});

/**
 * POST /api/ai/edit-itinerary
 * Chỉnh sửa lịch trình theo yêu cầu
 * Body: { currentItinerary, changeInstruction }
 */
router.post('/edit-itinerary', auth, async (req, res) => {
  try {
    const { currentItinerary, changeInstruction } = req.body;

    if (!currentItinerary || !changeInstruction) {
      return res.status(400).json({
        success: false,
        message: 'Thiếu currentItinerary hoặc changeInstruction',
      });
    }

    const currentJson =
      typeof currentItinerary === 'string' ? currentItinerary : JSON.stringify(currentItinerary);
    const userPrompt = buildEditPrompt(currentJson, changeInstruction);

    const completion = await openai.chat.completions.create({
      model: AI_MODEL,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userPrompt },
      ],
    });

    const rawContent = completion.choices?.[0]?.message?.content ?? '';
    const itinerary = extractJson(rawContent);

    if (!itinerary) {
      return res.status(500).json({
        success: false,
        message: 'AI không trả về JSON hợp lệ',
        raw: rawContent.substring(0, 500),
      });
    }

    const curr = typeof currentItinerary === 'string' ? (() => { try { return JSON.parse(currentItinerary); } catch { return {}; } })() : currentItinerary;
    const dest = curr?.trip_summary?.destination || curr?.destination || '';
    const enrichedItinerary = await enrichItineraryWithImages(itinerary, dest);

    res.json({
      success: true,
      itinerary: enrichedItinerary,
    });
  } catch (err) {
    console.error('AI edit-itinerary error:', err);
    res.status(500).json({
      success: false,
      message: 'Lỗi khi chỉnh sửa kế hoạch',
      detail: err.message || String(err),
    });
  }
});

/**
 * POST /api/ai/suggest-places
 * Gợi ý danh sách địa điểm gần đó từ Geoapify (không qua AI)
 * Body: { lat, lng, type }
 */
router.post('/suggest-places', auth, async (req, res) => {
  try {
    const { lat, lng, type } = req.body || {};

    if (!lat || !lng || !type) {
      return res.status(400).json({
        success: false,
        message: 'Thiếu lat, lng hoặc type',
      });
    }

    if (!GEOAPIFY_API_KEY) {
      return res.status(500).json({
        success: false,
        message: 'Geoapify API key chưa được cấu hình',
      });
    }

    const categories = getGeoapifyCategoriesForType(type);
    const radius = 2000;
    const url = `https://api.geoapify.com/v2/places?categories=${encodeURIComponent(
      categories
    )}&filter=circle:${lng},${lat},${radius}&limit=10&apiKey=${GEOAPIFY_API_KEY}`;

    const resp = await fetch(url);
    if (!resp.ok) {
      const txt = await resp.text();
      console.error('[AI suggest-places] Geoapify error', resp.status, txt);
      return res.status(200).json({ success: true, suggestions: [] });
    }

    const data = await resp.json();
    const rawPlaces = (data.features || []).map((f) => {
      const { properties, geometry } = f;
      const [lon, latVal] = geometry.coordinates || [];
      return {
        id: properties.place_id || properties.datasource?.raw?.place_id,
        name: properties.name || properties.street || 'Địa điểm gần đây',
        address:
          properties.formatted ||
          `${properties.address_line1 || ''} ${properties.address_line2 || ''}`.trim(),
        city: properties.city || properties.suburb || '',
        lat: latVal,
        lng: lon,
        categories: properties.categories || [],
      };
    });

    const suggestions = rawPlaces.slice(0, 5); // top 5 theo khoảng cách / scoring của Geoapify

    res.json({
      success: true,
      suggestions,
    });
  } catch (err) {
    console.error('AI suggest-places error:', err);
    res.status(500).json({
      success: false,
      message: 'Lỗi khi gợi ý địa điểm',
      detail: err.message || String(err),
    });
  }
});

module.exports = router;
