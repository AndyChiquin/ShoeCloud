const express = require('express');
const router = express.Router();
const { createProduct } = require('../controllers/createController');

router.post('/', createProduct);

module.exports = router;
