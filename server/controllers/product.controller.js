const { json } = require('express');
const Product = require('../models/Product');
const { getProductService } = require('../services/product.service');
const { deleteImages } = require('../utils/deleteImages');

exports.createPrduct = async (req, res) => {
	try {
		const product = JSON.parse(req.body.product);
		product.quantity = product.quantity;
		product.oldPrice = product.oldPrice;
		product.offerPercentage = product.offerPercentage;

		const imageUrls = req.files.map(
			(file) => `${process.env.APP_URL}/images/${file.filename}`
		);
		product.imageUrls = imageUrls;

		product.image = imageUrls[0];

		const newProduct = await Product.create(product);
		console.log(newProduct);

		// if (!newProduct || imageUrls.length ) {
		if (!newProduct) {
			return res.status(401).json({
				success: false,
				message: 'something went wrong please try again',
			});
		}
		return res.status(200).json({
			success: true,
			message: 'product added ',
		});
	} catch (error) {
		console.log(JSON.parse(req.body.product));
		console.log(error.message);
		return res.status(500).json({
			success: false,
			message: 'internal server error',
		});
	}
};

exports.getProducts = async (req, res) => {
	try {
		const products = await getProductService(req);
		if (!products || products.length < 1) {
			return res.status(404).json({
				success: false,
				message: 'no products found',
			});
		}
		return res.status(200).json({
			success: true,
			products,
		});
	} catch (error) {
		console.log(error);
		return res.status(404).json({
			success: false,
			message: 'internal server error',
		});
	}
};

exports.getAllproducts = async (req, res) => {
	try {
		const products = await Product.find({});
		return res.status(200).json({
			success: true,
			data: products,
		});
	} catch (error) {
		console.log(error);
		return res.status(404).json({
			success: false,
			message: 'internal server error',
		});
	}
};

// Controller function to get a single product by ID
exports.getProductById = async (req, res) => {
	try {
		const productId = req.params.productId; // Assuming you're passing the product ID in the URL parameter
		const product = await Product.findById(productId);

		if (!product) {
			return res.status(404).json({ error: 'Product not found' });
		}

		res.json(product);
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' });
	}
};

// exports.deleteProduct = async (req, res) => {
// 	try {
// 		const productId = req.params.productId;

// 		// Find the product by ID and delete it
// 		const deletedProduct = await Product.findByIdAndDelete(productId);

// 		if (!deletedProduct) {
// 			return res.status(404).json({
// 				status: 'fail',
// 				message: 'Product not found',
// 			});
// 		}

// 		res.status(200).json({
// 			success: true,
// 			message: 'Product deleted',
// 			data: deletedProduct,
// 		});
// 	} catch (error) {
// 		res.status(500).json({
// 			status: 'fail',
// 			message: 'An error occurred while deleting the product',
// 		});
// 	}
// };

exports.deleteProduct = async (req, res) => {
	try {
		const productId = req.params.productId;

		// Find the product by ID and retrieve its imageUrls
		const product = await Product.findById(productId);

		if (!product) {
			return res.status(404).json({
				status: 'fail',
				message: 'Product not found',
			});
		}
		deleteImages(product.imageUrls, 'images');
		// Delete the product from the database
		const deletedProduct = await Product.findByIdAndDelete(productId);
		res.status(200).json({
			success: true,
			message: 'Product and associated images deleted',
			data: deletedProduct,
		});
	} catch (error) {
		console.error(error); // Log the error for debugging purposes
		res.status(500).json({
			status: 'fail',
			message: 'An error occurred while deleting the product',
		});
	}
};
exports.updateProduct = async (req, res) => {
	try {
		const productId = req.params.productId;
		let updateData;
		let image;

		// Check if the request contains files (images) to update
		if (req.files) {
			updateData = JSON.parse(req.body.product); // Parsed updated data from the request body

			// Generate new image URLs for uploaded files
			const newImageUrls = req.files.map(
				(file) => `${process.env.APP_URL}/images/${file.filename}`
			);

			// Append the new image URLs to the existing ones
			const imageUrls = [...updateData.imageUrls, ...newImageUrls];
			updateData.imageUrls = imageUrls;
			updateData.image = imageUrls[0];
		} else {
			updateData = req.body; // Use request body as update data if no files were uploaded
		}

		if (updateData.deletedImages) {
			deleteImages(updateData.deletedImages, 'images');
		}

		// Find the product by ID and update it
		console.log(updateData);
		updateData.image = updateData.imageUrls[0];
		const updatedProduct = await Product.findByIdAndUpdate(
			productId,
			updateData,
			{ new: true }
		);

		if (!updatedProduct) {
			return res.status(404).json({
				success: false,
				message: 'Product not found',
			});
		}

		// Respond with a success message and updated product data
		res.status(200).json({
			success: true,
			message: 'Product updated',
			data: updatedProduct,
		});
	} catch (error) {
		// Handle any errors that occur during the update process
		res.status(500).json({
			success: false,
			message: 'An error occurred while updating the product',
		});
	}
};
