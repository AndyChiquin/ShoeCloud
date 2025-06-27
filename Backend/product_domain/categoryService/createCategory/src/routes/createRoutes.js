const express = require('express');
const router = express.Router();
const { create } = require('../controllers/createController');

// POST /api/category - Crear nueva categoría
router.post('/', create);

module.exports = router;
