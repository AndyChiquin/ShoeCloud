const express = require('express');
const router = express.Router();
const {
  getImagesByProductId,
  getAllImages
} = require('../controllers/readController');
/**
 * @swagger
 * /api/images:
 *   get:
 *     summary: Get all product images
 *     tags: [Images]
 *     responses:
 *       200:
 *         description: List of all images
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: 64c9a0b7e9f3f8a99d2a1d3c
 *                   url:
 *                     type: string
 *                     example: https://example.com/image1.jpg
 *                   productId:
 *                     type: string
 *                     example: 64a1c9a2f3c1b3f5d8e91d3c
 */
router.get('/', getAllImages);

router.get('/:product_id', getImagesByProductId);

module.exports = router;
