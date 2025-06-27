const express = require('express');
const router = express.Router();
const { updateInventory } = require('../controllers/updateController');

router.put('/:id', updateInventory);

module.exports = router;
