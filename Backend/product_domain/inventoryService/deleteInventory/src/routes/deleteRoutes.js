const express = require('express');
const router = express.Router();

const { deleteInventory } = require('../controllers/inventoryController');

router.delete('/:id', deleteInventory);

module.exports = router;
