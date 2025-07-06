const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  getProductsByCategory
} = require('../controllers/readController');

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of all products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: 64a1c9a2f3c1b3f5d8e91d3c
 *                   name:
 *                     type: string
 *                     example: Nike Air Max
 *                   price:
 *                     type: number
 *                     example: 89.99
 */
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.get('/category/:category_id', getProductsByCategory);

module.exports = router;
