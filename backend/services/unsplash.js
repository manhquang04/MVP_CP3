const PLACEHOLDER = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop';
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

/**
 * Tìm ảnh trên Unsplash
 * @param {string} searchQuery - Từ khóa tìm kiếm
 * @returns {Promise<string|null>} URL ảnh hoặc null
 */
async function searchUnsplash(searchQuery) {
  if (!UNSPLASH_ACCESS_KEY || !searchQuery) return null;
  
  try {
    const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(searchQuery)}&per_page=1&orientation=landscape&client_id=${UNSPLASH_ACCESS_KEY}`;
    const res = await fetch(url);

    if (!res.ok) {
      console.log('[Unsplash API] HTTP error:', res.status);
      return null;
    }

    const data = await res.json();
    const photo = data.results?.[0];
    
    if (photo?.urls?.raw) {
      console.log('[Unsplash API] Found image for:', searchQuery, '- Photo ID:', photo.id);
      return `${photo.urls.raw}?w=400&h=300&fit=crop&q=80`;
    }
    
    return null;
  } catch (error) {
    console.error('[Unsplash API] Error:', error.message);
    return null;
  }
}

/**
 * Lấy ảnh địa điểm qua Unsplash API
 * @param {string} query - Tên địa điểm cần tìm ảnh
 * @param {string} destination - Điểm đến (để tăng độ chính xác)
 * @returns {Promise<string>} URL ảnh
 */
async function fetchPlaceImageUrl(query, destination) {
  const search = [query, destination].filter(Boolean).join(' ');
  if (!search.trim()) return PLACEHOLDER;

  console.log('[Unsplash API] Searching for:', search);

  // Thử tìm với từ khóa đầy đủ
  let imageUrl = await searchUnsplash(search);
  
  // Nếu không có kết quả, thử với từ khóa đơn giản hơn
  if (!imageUrl && query) {
    console.log('[Unsplash API] Trying simpler query:', query);
    imageUrl = await searchUnsplash(query);
  }
  
  // Nếu vẫn không có kết quả, thử với destination
  if (!imageUrl && destination) {
    console.log('[Unsplash API] Trying destination only:', destination);
    imageUrl = await searchUnsplash(destination);
  }

  if (imageUrl) {
    return imageUrl;
  }
  
  console.log('[Unsplash API] No results found, using placeholder');
  return PLACEHOLDER;
}

async function enrichItineraryWithImages(itinerary, destination) {
  const dest = destination || itinerary?.trip_summary?.destination || '';
  const enriched = { ...itinerary };

  if (enriched.hotel) {
    enriched.hotel = { ...enriched.hotel };
    enriched.hotel.image_url = await fetchPlaceImageUrl(enriched.hotel.name, dest);
  }

  if (enriched.days && Array.isArray(enriched.days)) {
    enriched.days = await Promise.all(
      enriched.days.map(async (day) => {
        const d = { ...day };
        if (d.activities && Array.isArray(d.activities)) {
          d.activities = await Promise.all(
            d.activities.map(async (a) => {
              const act = { ...a };
              act.image_url = await fetchPlaceImageUrl(a.title, dest);
              return act;
            })
          );
        }
        return d;
      })
    );
  }

  return enriched;
}

module.exports = { fetchPlaceImageUrl, enrichItineraryWithImages };