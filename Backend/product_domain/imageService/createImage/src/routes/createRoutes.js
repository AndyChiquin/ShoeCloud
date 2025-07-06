const express = require('express');
const router = express.Router();
const { uploadImage } = require('../controllers/createController');
/**
 * @swagger
 * /api/images:
 *   post:
 *     summary: Upload a new image
 *     tags: [Images]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - url
 *               - productId
 *             properties:
 *               url:
 *                 type: string
 *                 example: https://example.com/image.jpg
 *               productId:
 *                 type: string
 *                 example: 64a1c9a2f3c1b3f5d8e91d3c
 *     responses:
 *       201:
 *         description: Image uploaded successfully
 *       400:
 *         description: Invalid input
 */
router.post('/', uploadImage);

module.exports = router;
