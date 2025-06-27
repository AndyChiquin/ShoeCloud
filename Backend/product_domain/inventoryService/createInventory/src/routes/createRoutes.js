const express = require('express');
const router = express.Router();
const { createInventory } = require('../controllers/createController');

router.post('/', createInventory);

module.exports = router;
