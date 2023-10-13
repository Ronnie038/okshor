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