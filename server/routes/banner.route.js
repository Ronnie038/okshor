const express = require('express');
const router = express.Router();
const bannerController = require('../controllers/banner.controller');
const verifyToken = require('../middleware/verifyToken');
const authorization = require('../middleware/authorization');
const { uploader } = require('../middleware/uploader');

// Route to add an item to the cart

router.post(
	'/',
	verifyToken,
	authorization('admin'),
	uploader.single('image'),
	bannerController.createBanner
);

router.get('/', bannerController.getBanners);
// Route to update the quantity of an item in the cart

router
	.route('/:id')
	.delete(verifyToken, authorization('admin'), bannerController.deleteBanner);

// Route to get the contents of the user's cart

module.exports = router;
