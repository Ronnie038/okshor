const News = require('../models/News');
const Product = require('../models/Product');

exports.getNewsService = async (req) => {
	let queryData = req.query;
	const category = queryData.category;
	const query = {};
	// if (!category == 'undefined') {
	query.category = category;
	// }
	// console.log(queryData);
	const news = await News.find(query);

	return news;
};
