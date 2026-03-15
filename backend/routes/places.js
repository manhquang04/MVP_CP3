const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const GEOAPIFY_API_KEY = process.env.GEOAPIFY_API_KEY;

// Map our UI categories to Geoapify categories
function getGeoapifyCategories(category) {
    switch (category) {
        case 'restaurant':
            return 'catering.restaurant';
        case 'cafe':
            return 'catering.cafe';
        case 'tourist_attraction':
            return 'tourism.attraction,entertainment.culture';
        case 'lodging':
            return 'accommodation.hotel,accommodation.motel,accommodation.guest_house';
        case 'bar':
            return 'catering.bar';
        case 'store':
            return 'commercial.shopping_mall,commercial';
        case 'all':
        default:
            return 'catering,commercial,entertainment,accommodation,tourism';
    }
}

// Calculate distance between two coordinates (in km)
function calculateDistance(lat1, lng1, lat2, lng2) {
    if (
        lat1 === undefined ||
        lng1 === undefined ||
        lat2 === undefined ||
        lng2 === undefined
    ) {
        return null;
    }

    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) *
            Math.cos(toRad(lat2)) *
            Math.sin(dLng / 2) *
            Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    if (distance < 1) {
        return `${Math.round(distance * 1000)}m`;
    }
    return `${distance.toFixed(1)}km`;
}

function toRad(deg) {
    return (deg * Math.PI) / 180;
}

// Search nearby places using Geoapify Places API
router.get('/nearby', auth, async (req, res) => {
    try {
        const { lat, lng, category = 'all', type = '', query = '', radius = 3000 } = req.query;

        if (!lat || !lng) {
            return res.status(400).json({
                success: false,
                message: 'Latitude and longitude are required'
            });
        }

        if (!GEOAPIFY_API_KEY) {
            return res.status(500).json({
                success: false,
                message: 'Geoapify API key is not configured'
            });
        }

        // Use custom type if provided, otherwise use category
        let categories;
        if (type && type.trim()) {
            // Map common type names to Geoapify categories
            const typeLower = type.toLowerCase().trim();
            if (
                typeLower.includes('restaurant') ||
                typeLower.includes('food') ||
                typeLower.includes('nha hang') ||
                typeLower.includes('nhà hàng') ||
                typeLower.includes('quan an') ||
                typeLower.includes('quán ăn') ||
                typeLower.includes('an uong') ||
                typeLower.includes('ăn uống')
            ) {
                categories = 'catering.restaurant';
            } else if (
                typeLower.includes('cafe') ||
                typeLower.includes('coffee') ||
                typeLower.includes('quan cafe') ||
                typeLower.includes('quán cafe') ||
                typeLower.includes('ca phe') ||
                typeLower.includes('cà phê') ||
                typeLower.includes('quan ca phe') ||
                typeLower.includes('quán cà phê') ||
                typeLower.includes('tra sua') ||
                typeLower.includes('trà sữa')
            ) {
                categories = 'catering.cafe';
            } else if (
                typeLower.includes('hotel') ||
                typeLower.includes('khach san') ||
                typeLower.includes('khách sạn') ||
                typeLower.includes('accommodation') ||
                typeLower.includes('resort') ||
                typeLower.includes('homestay')
            ) {
                categories = 'accommodation.hotel,accommodation.motel,accommodation.guest_house';
            } else if (
                typeLower.includes('bar') ||
                typeLower.includes('pub') ||
                typeLower.includes('bia') ||
                typeLower.includes('quán nhậu')
            ) {
                categories = 'catering.bar';
            } else if (
                typeLower.includes('attraction') ||
                typeLower.includes('tourist') ||
                typeLower.includes('landmark') ||
                typeLower.includes('diem den') ||
                typeLower.includes('điểm đến') ||
                typeLower.includes('diem du lich') ||
                typeLower.includes('điểm du lịch') ||
                typeLower.includes('khu du lich') ||
                typeLower.includes('khu du lịch')
            ) {
                categories = 'tourism.attraction,entertainment.culture';
            } else if (
                typeLower.includes('shop') ||
                typeLower.includes('store') ||
                typeLower.includes('mall') ||
                typeLower.includes('cua hang') ||
                typeLower.includes('cửa hàng') ||
                typeLower.includes('sieu thi') ||
                typeLower.includes('siêu thị')
            ) {
                categories = 'commercial.shopping_mall,commercial';
            } else if (typeLower.includes('park') || typeLower.includes('garden')) {
                categories = 'leisure.park,natural';
            } else if (typeLower.includes('museum')) {
                categories = 'entertainment.museum';
            } else if (typeLower.includes('hospital') || typeLower.includes('clinic') || typeLower.includes('benh vien')) {
                categories = 'healthcare.hospital,healthcare.clinic';
            } else if (typeLower.includes('bank') || typeLower.includes('atm')) {
                categories = 'service.financial';
            } else if (typeLower.includes('gas') || typeLower.includes('petrol') || typeLower.includes('tram xang')) {
                categories = 'service.fuel';
            } else {
                // Use the type as-is for flexibility
                categories = type;
            }
        } else {
            categories = getGeoapifyCategories(category);
        }
        const textParam = query ? `&text=${encodeURIComponent(query)}` : '';

        // Geoapify expects filter circle:lon,lat,radius
        const url = `https://api.geoapify.com/v2/places?categories=${encodeURIComponent(
            categories
        )}&filter=circle:${lng},${lat},${radius}&limit=20${textParam}&apiKey=${GEOAPIFY_API_KEY}`;

        console.log('[Geoapify] Nearby search URL:', url.replace(GEOAPIFY_API_KEY, '***'));

        const response = await fetch(url);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('[Geoapify] HTTP error:', response.status, errorText);
            return res.status(200).json({
                success: true,
                places: [],
                message: 'Failed to fetch places from Geoapify'
            });
        }

        const data = await response.json();

        const places = (data.features || []).map((feature) => {
            const { properties, geometry } = feature;
            const [lon, latVal] = geometry.coordinates || [];

            const distance =
                properties.distance != null
                    ? properties.distance < 1000
                        ? `${Math.round(properties.distance)}m`
                        : `${(properties.distance / 1000).toFixed(1)}km`
                    : calculateDistance(
                          parseFloat(lat),
                          parseFloat(lng),
                          latVal,
                          lon
                      );

            return {
                id: properties.place_id || properties.datasource?.raw?.place_id,
                name: properties.name || properties.street || 'Unknown place',
                address:
                    properties.formatted ||
                    `${properties.address_line1 || ''} ${properties.address_line2 || ''}`.trim(),
                vicinity: properties.city || properties.suburb || '',
                location: {
                    lat: latVal,
                    lng: lon
                },
                category: (properties.categories && properties.categories[0]) || 'Place',
                categories: properties.categories || [],
                photo: null, // Geoapify free tier does not include photos directly
                distance
            };
        });

        console.log('[Geoapify] Found places:', places.length);

        res.json({
            success: true,
            places,
            total: places.length
        });
    } catch (error) {
        console.error('[Geoapify] Nearby error:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching places'
        });
    }
});

// Simple text search using Geoapify (used for autocomplete/search box)
router.get('/search', auth, async (req, res) => {
    try {
        const { query, lat, lng, radius = 50000 } = req.query;

        if (!query) {
            return res.status(400).json({
                success: false,
                message: 'Query is required'
            });
        }

        if (!GEOAPIFY_API_KEY) {
            return res.status(500).json({
                success: false,
                message: 'Geoapify API key is not configured'
            });
        }

        const categories = getGeoapifyCategories('all');
        const center =
            lat && lng
                ? `&filter=circle:${lng},${lat},${radius}`
                : '';

        const url = `https://api.geoapify.com/v2/places?categories=${encodeURIComponent(
            categories
        )}&text=${encodeURIComponent(query)}${center}&limit=10&apiKey=${GEOAPIFY_API_KEY}`;

        console.log('[Geoapify] Search URL:', url.replace(GEOAPIFY_API_KEY, '***'));

        const response = await fetch(url);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('[Geoapify] Search HTTP error:', response.status, errorText);
            return res.json({ success: true, places: [] });
        }

        const data = await response.json();

        const places = (data.features || []).map((feature) => {
            const { properties, geometry } = feature;
            const [lon, latVal] = geometry.coordinates || [];

            return {
                id: properties.place_id || properties.datasource?.raw?.place_id,
                name: properties.name || properties.street || 'Unknown place',
                address:
                    properties.formatted ||
                    `${properties.address_line1 || ''} ${properties.address_line2 || ''}`.trim(),
                vicinity: properties.city || properties.suburb || '',
                location: {
                    lat: latVal,
                    lng: lon
                },
                category: (properties.categories && properties.categories[0]) || 'Place'
            };
        });

        res.json({
            success: true,
            places
        });
    } catch (error) {
        console.error('[Geoapify] Search error:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

// Optional: placeholder endpoints for details & photos (not used currently)
router.get('/:placeId', auth, async (req, res) => {
    res.status(501).json({
        success: false,
        message: 'Place details not implemented for Geoapify'
    });
});

router.get('/:placeId/photos', auth, async (req, res) => {
    res.status(501).json({
        success: false,
        message: 'Place photos not implemented for Geoapify'
    });
});

module.exports = router;