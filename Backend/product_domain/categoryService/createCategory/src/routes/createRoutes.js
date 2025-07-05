const express = require('express');
const router = express.Router();
const { create } = require('../controllers/createController');

router.post('/', create);

module.exports = router;
