/**
 * Places API (Legacy) - Lấy ảnh địa điểm thực tế từ Google Places
 * Dùng cho AI plan: tìm place theo tên + destination, lấy ảnh đầu tiên
 */
const GCP_PLACE_API_KEY = process.env.GCP_PLACE_API_KEY;

/**
 * Tìm địa điểm qua Text Search (Legacy) và lấy URL ảnh đầu tiên
 * @param {string} query - Tên địa điểm (VD: "Khách sạn Dalat Palace")
 * @param {string} destination - Điểm đến (VD: "Đà Lạt") để tăng độ chính xác
 * @returns {Promise<string|null>} URL ảnh hoặc null nếu không có
 */
async function fetchPlaceImageUrl(query, destination) {
  if (!GCP_PLACE_API_KEY || !query?.trim()) {
    console.log('[Places API] Missing API key or query');
    return null;
  }

  const textQuery = [query, destination].filter(Boolean).join(', ') + ' Vietnam';
  console.log('[Places API] Searching for:', textQuery);

  try {
    // 1. Text Search (Legacy) - tìm place
    const searchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(textQuery)}&key=${GCP_PLACE_API_KEY}`;
    console.log('[Places API] Request URL:', searchUrl.replace(GCP_PLACE_API_KEY, 'API_KEY_HIDDEN'));
    
    const searchRes = await fetch(searchUrl);

    if (!searchRes.ok) {
      console.log('[Places API] HTTP error:', searchRes.status);
      return null;
    }

    const searchData = await searchRes.json();
    console.log('[Places API] Response status:', searchData.status);
    
    if (searchData.status === 'REQUEST_DENIED') {
      console.error('[Places API] REQUEST_DENIED - Check if Places API is enabled in GCP Console');
      console.error('[Places API] Error message:', searchData.error_message);
      return null;
    }
    
    if (searchData.status !== 'OK' && searchData.status !== 'ZERO_RESULTS') {
      console.log('[Places API] Unexpected status:', searchData.status);
      return null;
    }

    if (searchData.status === 'ZERO_RESULTS') {
      console.log('[Places API] No results found for:', textQuery);
      return null;
    }

    const place = searchData.results?.[0];
    if (!place) {
      console.log('[Places API] No place in results');
      return null;
    }

    console.log('[Places API] Found place:', place.name);
    
    const photoRef = place.photos?.[0]?.photo_reference;
    if (!photoRef) {
      console.log('[Places API] No photo for place:', place.name);
      return null;
    }

    // 2. Place Photo (Legacy) - URL redirect tới ảnh, dùng trực tiếp trong img src
    const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${encodeURIComponent(photoRef)}&key=${GCP_PLACE_API_KEY}`;
    console.log('[Places API] Got photo URL for:', place.name);
    return photoUrl;
  } catch (error) {
    console.error('[Places API] Error:', error.message);
    return null;
  }
}

module.exports = { fetchPlaceImageUrl };