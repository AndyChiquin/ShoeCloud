const searchService = require('../services/searchService');

const search = async (req, res) => {
  try {
    const keyword = req.query.q;
    const results = await searchService.searchProducts(keyword);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'Search failed', details: error.message });
  }
};

module.exports = {
  search,
};
