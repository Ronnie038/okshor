const Bcs = require('../models/Bcs');
const { getBcsNewsSerivice } = require('../services/bsc.service');
const { deleteImages } = require('../utils/deleteImages');

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

exports.getBcsById = async (req, res) => {
	try {
		const id = req.params.id;
		const bcsNews = await Bcs.findById(id);

		res.status(200).json({
			success: true,
			data: bcsNews,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

exports.updateBcsById = async (req, res) => {
	try {
		const id = req.params.id;
		const updatedData = req.body;

		// Check if the ID is valid
		if (!id || !updatedData) {
			return res.status(400).json({
				success: false,
				message: 'Bad request. ID and updated data are required.',
			});
		}

		// Find and update the Bcs document by ID
		const updatedBcs = await Bcs.findByIdAndUpdate(id, updatedData, {
			new: true,
		});

		if (!updatedBcs) {
			return res.status(404).json({
				success: false,
				message: 'Bcs not found',
			});
		}

		res.status(200).json({
			success: true,
			message: 'Bcs updated successfully',
			data: updatedBcs,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: 'Internal server error',
			error: error.message, // Include the error message for debugging
		});
	}
};

exports.deleteNewsById = async (req, res) => {
	try {
		const newsId = req.params.id;

		const news = await Bcs.findById(newsId);

		// Find the product by ID and delete it
		if (!news) {
			return res.status(404).json({
				status: 'fail',
				message: 'news not found',
			});
		}
		deleteImages([news.image], 'images');

		const deltedNews = await Bcs.findByIdAndDelete(newsId);

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
