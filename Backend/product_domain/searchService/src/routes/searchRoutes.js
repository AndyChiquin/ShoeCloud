const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

// ✅ SRP - Single Responsibility Principle
// This router only defines endpoints and delegates logic to the controller.

// ✅ RESTful Design
// The routes follow a REST-style structure: GET for searching, POST for indexing.

// ✅ KISS - Keep It Simple, Stupid
// The routing logic is kept clean and minimal, making it easy to understand and maintain.

router.get('/', searchController.search);
router.post('/index', searchController.indexProduct);

module.exports = router;
