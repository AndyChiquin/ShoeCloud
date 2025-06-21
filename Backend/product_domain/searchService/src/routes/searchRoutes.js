const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

router.get('/', searchController.search);
router.post('/index', searchController.indexProduct);


module.exports = router;
