const express = require('express');
const router = express.Router();
const {
  updateProduct,
  updateProductByProductId
} = require('../controllers/updateController');

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the product to update
 *         example: 64a1c9a2f3c1b3f5d8e91d3c
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Adidas Superstar
 *               price:
 *                 type: number
 *                 example: 79.99
 *     responses:
 *       200:
 *         description: Product successfully updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Product not found
 */
router.put('/:id', updateProduct);
router.put('/by-product/:product_id', updateProductByProductId);

module.exports = router;
