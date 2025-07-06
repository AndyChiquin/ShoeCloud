const express = require('express');
const router = express.Router();

const {
  getAllInventory,
  getInventoryById
} = require('../controllers/readController');
/**
 * @swagger
 * /api/inventory:
 *   get:
 *     summary: Get all inventory items
 *     tags: [Inventory]
 *     responses:
 *       200:
 *         description: List of inventory items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   productId:
 *                     type: string
 *                     example: 64a1c9a2f3c1b3f5d8e91d3c
 *                   quantity:
 *                     type: integer
 *                     example: 50
 */
router.get('/', getAllInventory);      

router.get('/:id', getInventoryById);  

module.exports = router;
