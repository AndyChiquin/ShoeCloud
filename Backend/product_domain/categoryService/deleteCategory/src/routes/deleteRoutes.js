const express = require('express');
const router = express.Router();
const { remove } = require('../controllers/deleteController');
/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     summary: Delete a category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the category to delete
 *         example: 64c88e372ba90f001e0a2f3e
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       404:
 *         description: Category not found
 */
router.delete('/:id', remove);

module.exports = router;
