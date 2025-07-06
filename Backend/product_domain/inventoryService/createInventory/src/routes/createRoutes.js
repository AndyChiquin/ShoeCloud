const express = require('express');
const router = express.Router();
const { createInventory } = require('../controllers/createController');

/**
 * @swagger
 * /api/inventory:
 *   post:
 *     summary: Add a new inventory item
 *     tags: [Inventory]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - quantity
 *             properties:
 *               productId:
 *                 type: string
 *                 example: 64a1c9a2f3c1b3f5d8e91d3c
 *               quantity:
 *                 type: integer
 *                 example: 100
 *     responses:
 *       201:
 *         description: Inventory item added
 *       400:
 *         description: Invalid input
 */
router.post('/', createInventory);

module.exports = router;
