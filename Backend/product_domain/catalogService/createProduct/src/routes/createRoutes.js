const express = require('express');
const router = express.Router();
const { createProduct } = require('../controllers/createController');

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *                 example: Nike Air Max
 *               price:
 *                 type: number
 *                 example: 99.99
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Invalid input
 */

router.post('/', createProduct);

module.exports = router;
