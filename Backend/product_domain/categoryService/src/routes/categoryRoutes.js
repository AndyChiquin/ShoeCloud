const express = require('express');
const router = express.Router();
const controller = require('../controllers/categoryController');

router.post('/', controller.create);           // POST /api/category
router.get('/', controller.getAll);            // GET  /api/category
router.get('/:id', controller.getById);        // GET  /api/category/:id
router.put('/:id', controller.update);         // PUT  /api/category/:id
router.delete('/:id', controller.remove);      // DELETE /api/category/:id

module.exports = router;
