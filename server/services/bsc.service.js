const Bsc = require('../models/Bcs');

exports.getBcsNewsSerivice = async (req) => {
	const queryData = req.query;
	let query = {};

	const category = queryData.category;
	const subcategory = queryData.subcategory;
	if (category) {
		query.category = category;
		// query.subcategory = subcategory;
	}

	const bcsNewses = await Bsc.find(query).sort({ createdAt: -1 });

	return bcsNewses;
};
