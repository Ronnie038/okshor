const News = require('../models/News');
const { getNewsService } = require('../services/news.service');

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

exports.deleteNewsById = async (req, res) => {
	try {
		const newsId = req.params.id;

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
