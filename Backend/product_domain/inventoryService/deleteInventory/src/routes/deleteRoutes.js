const express = require('express');
const router = express.Router();

const { deleteInventory } = require('../controllers/deleteController');

router.delete('/:id', deleteInventory);

module.exports = router;
