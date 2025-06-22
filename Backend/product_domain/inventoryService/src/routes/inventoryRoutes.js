const express = require('express');
const router = express.Router();

const {
  createInventory,
  getAllInventory,
  getInventoryById,
  updateInventory,
  deleteInventory
} = require('../controllers/inventoryController');

// ✅ SRP (Single Responsibility Principle - SOLID):
// Each controller function handles only one specific task related to inventory.

// ✅ DRY (Don't Repeat Yourself):
// Centralized route handling avoids repeating logic in multiple places.

// ✅ KISS (Keep It Simple, Stupid):
// Clear and minimal routing setup for each HTTP method.

// CRUD Endpoints
router.post('/', createInventory);     // Create inventory
router.get('/', getAllInventory);      // Read all inventory items
router.get('/:id', getInventoryById);  // Read one inventory item
router.put('/:id', updateInventory);   // Update inventory item
router.delete('/:id', deleteInventory);// Delete inventory item

module.exports = router; // ✅ Encapsulation: exporting the router cleanly
