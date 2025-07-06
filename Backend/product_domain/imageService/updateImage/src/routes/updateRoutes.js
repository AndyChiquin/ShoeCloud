const express = require('express');
const router = express.Router();
const { updateImageByProductId } = require('../controllers/updateController');
/**
 * @swagger
 * /api/images/{id}:
 *   put:
 *     summary: Update image details by ID
 *     tags: [Images]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the image to update
 *         example: 64c9a0b7e9f3f8a99d2a1d3c
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *                 example: https://example.com/updated.jpg
 *     responses:
 *       200:
 *         description: Image updated successfully
 *       404:
 *         description: Image not found
 */
router.put('/:product_id', updateImageByProductId);

module.exports = router;
