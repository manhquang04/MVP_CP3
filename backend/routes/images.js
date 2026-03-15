const express = require('express');
const router = express.Router();
const { fetchPlaceImageUrl } = require('../services/unsplash');

const PLACEHOLDER = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop';

/**
 * GET /api/images/place?query=Da+Lat+Vietnam&destination=Da+Lat
 * Tìm ảnh địa điểm: ưu tiên GCP Place API, fallback Unsplash
 */
router.get('/place', async (req, res) => {
  try {
    const query = (req.query.query || '').trim();
    const destination = (req.query.destination || '').trim();
    if (!query) {
      return res.json({ url: PLACEHOLDER });
    }

    const url = await fetchPlaceImageUrl(query, destination);
    res.json({ url: url || PLACEHOLDER });
  } catch (err) {
    console.error('Place image search error:', err);
    res.json({ url: PLACEHOLDER });
  }
});

module.exports = router;
