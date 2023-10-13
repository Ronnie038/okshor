const express = require('express');

const router = express.Router();
const bcsController = require('../controllers/bsc.controller');
const { uploader } = require('../middleware/uploader');
const verifyToken = require('../middleware/verifyToken');
const authorization = require('../middleware/authorization');

router
	.route('/')
	.post(uploader.single('bcsImage'), bcsController.createBcs)
	.get(bcsController.getBcs);

module.exports = router;
