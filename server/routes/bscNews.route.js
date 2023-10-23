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

router
	.route('/:id')
	.get(bcsController.getBcsById)
	.put(verifyToken, authorization('admin'), bcsController.updateBcsById)
	.delete(verifyToken, authorization('admin'), bcsController.deleteNewsById);
module.exports = router;
