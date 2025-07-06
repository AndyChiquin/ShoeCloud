const express = require('express');
const router = express.Router();

const { deleteInventory } = require('../controllers/deleteController');
/**
 * @swagger
 * /api/inventory/{productId}:
 *   delete:
 *     summary: Delete an inventory item by product ID
 *     tags: [Inventory]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID of the inventory item
 *         example: 64a1c9a2f3c1b3f5d8e91d3c
 *     responses:
 *       200:
 *         description: Inventory item deleted
 *       404:
 *         description: Inventory item not found
 */
router.delete('/:id', deleteInventory);

module.exports = router;
