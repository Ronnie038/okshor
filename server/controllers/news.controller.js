const News = require('../models/News');
const { getNewsService } = require('../services/news.service');

exports.createNews = async (req, res) => {
	try {
		const news = JSON.parse(req.body.news);

		news.image = `${process.env.APP_URL}/images/${req.file.filename}`;

		console.log(news);
		const newNews = await News.create(news);
		if (!newNews) {
			return res.status(401).json({
				success: false,
				message: 'something went wrong please try again',
			});
		}
		console.log(newNews);
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
