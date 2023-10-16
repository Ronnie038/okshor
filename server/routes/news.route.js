const express = require('express');

const router = express.Router();
const newsController = require('../controllers/news.controller');
const { uploader } = require('../middleware/uploader');
const verifyToken = require('../middleware/verifyToken');
const authorization = require('../middleware/authorization');

router
	.route('/')
	.post(uploader.single('images'), newsController.createNews)
	.get(newsController.getNews);

router
	.route('/:_id')
	.get(newsController.getSingleNews)
	.put(verifyToken, authorization('admin'), newsController.updateNewsById)
	.delete(verifyToken, authorization('admin'), newsController.deleteNewsById);
module.exports = router;
