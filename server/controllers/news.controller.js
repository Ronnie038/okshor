const News = require('../models/News');
const { getNewsService } = require('../services/news.service');
const { deleteImages } = require('../utils/deleteImages');

exports.createNews = async (req, res) => {
	try {
		let news;
		console.log(req.body);
		if (req.body.news) {
			news = JSON.parse(req.body.news);
			news.image = `${process.env.APP_URL}/images/${req.file.filename}`;
		} else {
			news = req.body;
		}

		console.log(news);
		const newNews = await News.create(news);
		if (!newNews) {
			return res.status(401).json({
				success: false,
				message: 'something went wrong please try again',
			});
		}

		return res.status(200).json({
			success: true,
			message: 'news added ',
			data: news,
		});
	} catch (error) {
		console.log(error.message);
		return res.status(500).json({
			success: false,
			message: 'internal server error',
		});
	}
};

exports.getNews = async (req, res) => {
	try {
		const news = await getNewsService(req);
		if (!news) {
			return res.status(403).json({
				success: false,
				message: 'no news found',
			});
		}

		res.status(200).json({
			success: true,
			data: news,
		});
	} catch (error) {
		console.log(error.message);
		res.status(500).json({
			success: false,
			message: 'something went wrong please try again',
		});
	}
};
exports.getSingleNews = async (req, res) => {
	try {
		const { _id } = req.params;
		const news = await News.findById(_id);
		if (!news) {
			return res.status(403).json({
				success: false,
				message: 'no news found',
			});
		}

		res.status(200).json({
			success: true,
			data: news,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: 'internal server error',
		});
	}
};

exports.updateNewsById = async (req, res) => {
	try {
		const { _id } = req.params;
		const updateData = req.body; // Assuming the updated data is sent in the request body

		// Use async/await to find and update the news by ID
		const news = await News.findByIdAndUpdate(_id, updateData, { new: true });

		if (!news) {
			// Return a 404 status code and a more informative message if the news is not found
			return res.status(404).json({
				success: false,
				message: 'News not found',
			});
		}

		// Return a 200 status code with the updated news
		res.status(200).json({
			success: true,
			data: news,
		});
	} catch (error) {
		// Handle any unexpected errors with a 500 status code
		res.status(500).json({
			success: false,
			message: 'Internal server error',
		});
	}
};

exports.deleteNewsById = async (req, res) => {
	try {
		const newsId = req.params._id;

		const news = await News.findById(newsId);

		if (!news) {
			return res.status(403).json({
				success: false,
				message: 'news not found',
			});
		}

		deleteImages([news.image], 'images');
		// Find the product by ID and delete it
		const deltedNews = await News.findByIdAndDelete(newsId);

		if (!deltedNews) {
			return res.status(404).json({
				status: 'fail',
				message: 'news not found',
			});
		}

		res.status(200).json({
			success: true,
			message: 'Product deleted',
			data: deltedNews,
		});
	} catch (error) {
		res.status(500).json({
			status: 'fail',
			message: 'An error occurred while deleting the product',
		});
	}
};
