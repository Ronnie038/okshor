const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');
const uploader = require('../middleware/uploader');

router
	.route('/')
	.post(uploader.single('images'), categoryController.createSubcategory)
	.get(categoryController.getCategories);

router
	.route('/:id')
	.get(categoryController.getCategoryById)
	.delete(categoryController.deleteCategoryById);
// .patch(categoryController.updateBrand);

module.exports = router;
