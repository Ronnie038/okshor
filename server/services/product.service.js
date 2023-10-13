const Product = require('../models/Product');

exports.getProductService = async (req) => {
	try {
		// console.log(req.query);

		const category = req.query.section; // Get category from query
		// const maxPrice = req.query.maxPrice; // Get maxPrice from query

		// Build query based on criteria

		const query = {};
		if (category) query.category = category;
		const products = await Product.find(query);
		return products;
	} catch (error) {
		console.log(error);
		res.status(500).json({
			status: 'fail',
			message: 'An error occurred while fetching products',
		});
	}
};
