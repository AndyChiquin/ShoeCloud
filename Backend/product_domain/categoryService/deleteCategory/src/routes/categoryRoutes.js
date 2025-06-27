const express = require('express');
const router = express.Router();
const controller = require('../controllers/categoryController');

// ✅ KISS: Each route is simple and clearly mapped
// ✅ SRP: Delegates logic to controller layer
// ✅ MVC: This is the routing layer; controller handles logic

router.post('/', controller.create);           // POST /api/category - Create category
router.get('/', controller.getAll);            // GET  /api/category - Retrieve all categories
router.get('/:id', controller.getById);        // GET  /api/category/:id - Retrieve category by ID
router.put('/:id', controller.update);         // PUT  /api/category/:id - Update category by ID
router.delete('/:id', controller.remove);      // DELETE /api/category/:id - Delete category by ID

module.exports = router;
