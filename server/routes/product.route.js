const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const { uploader } = require('../middleware/uploader');
const verifyToken = require('../middleware/verifyToken');
const authorization = require('../middleware/authorization');

router
	.route('/')
	.post(uploader.array('images', 5), productController.createPrduct)
	.get(productController.getProducts);

router.get('/displayProducts', productController.getAllproducts);

// router.get('/section/:id', productController.getProductsBySection);
router
	.route('/:productId')
	.get(productController.getProductById)
	.put(
		verifyToken,
		authorization('admin'),
		uploader.array('images', 5),
		productController.updateProduct
	)
	.delete(verifyToken, authorization('admin'), productController.deleteProduct);

module.exports = router;
