const Bcs = require('../models/Bcs');
const { getBcsNewsSerivice } = require('../services/bsc.service');

exports.createBcs = async (req, res) => {
	try {
		const bcsData = JSON.parse(req.body.bcs);
		const imageUrl = `${process.env.APP_URL}/images/${req.file.filename}`;
		bcsData.image = imageUrl;

		const newBcsData = await Bcs.create(bcsData);
		if (!newBcsData) {
			return res.status(500).json({
				success: false,
				message: `Error while creating a new ${bcsData.title} data   `,
			});
		}

		res.status(200).json({
			success: true,
			message: `${bcsData.category} ${bcsData.subcategory}  created successfully!`,
		});
	} catch (error) {
		console.log(error.message);
		res.status(500).json({
			success: false,
			message: 'internal server error',
		});
	}
};

exports.getBcs = async (req, res) => {
	try {
		const bcsNewses = await getBcsNewsSerivice(req);

		if (!bcsNewses.length) {
			return res.status(403).json({
				success: false,
				message: 'no data found',
			});
		}

		res.status(200).json({
			success: true,
			data: bcsNewses,
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
		const deltedNews = await Bcs.findByIdAndDelete(newsId);

		if (!deltedNews) {
			return res.status(404).json({
				status: 'fail',
				message: 'Product not found',
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
