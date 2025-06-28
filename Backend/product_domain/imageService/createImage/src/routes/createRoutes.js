const express = require('express');
const router = express.Router();
const { uploadImage } = require('../controllers/createController');

router.post('/', uploadImage);

module.exports = router;
