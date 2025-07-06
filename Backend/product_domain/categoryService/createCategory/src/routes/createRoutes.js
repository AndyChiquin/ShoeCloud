const express = require('express');
const router = express.Router();
const { create } = require('../controllers/createController');
/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Shoes
 *     responses:
 *       201:
 *         description: Category created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/', create);

module.exports = router;
