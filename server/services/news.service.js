const News = require('../models/News');
const Product = require('../models/Product');

exports.getNewsService = async (req) => {
	let queryData = req.query;
	const category = queryData.category;
	let query = {};
	// if (!category == 'undefined') {
	query.category = category;
	// }
	if (category === 'all') query = {};
	// console.log(queryData);
	console.log(category);
	const news = await News.find(query).sort({ updatedAt: -1 });

	return news;
};
