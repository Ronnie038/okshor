const Product = require('../models/Product');

exports.getProductService = async (req) => {
	try {
		// console.log(req.query);

		const queryData = req.query; // Get category from query
		// const maxPrice = req.query.maxPrice; // Get maxPrice from query
		const skip = Number(queryData.skip);
		const limit = Number(queryData.limit);

		// Build query based on criteria
		console.log({ skip, limit });
		const query = {};
		const products = await Product.find(query).sort({ createdAt: -1 });

		// const productCount = await Product.countDocuments({});
		// console.log(products);

		return products;
	} catch (error) {
		console.log(error);
		res.status(500).json({
			status: 'fail',
			message: 'An error occurred while fetching products',
		});
	}
};
