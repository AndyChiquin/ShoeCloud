const express = require('express');
const router = express.Router();

const {
  createInventory,
  getAllInventory,
  getInventoryById,
  updateInventory,
  deleteInventory
} = require('../controllers/inventoryController');



router.post('/', createInventory);     
router.get('/', getAllInventory);      
router.get('/:id', getInventoryById);  
router.put('/:id', updateInventory);   
router.delete('/:id', deleteInventory);

module.exports = router; 