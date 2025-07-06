const express = require('express');
const router = express.Router();
const { getAll, getById } = require('../controllers/readController');
/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: List of all categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: 64c88e372ba90f001e0a2f3e
 *                   name:
 *                     type: string
 *                     example: Shoes
 */
router.get('/', getAll);

router.get('/:id', getById);

module.exports = router;
