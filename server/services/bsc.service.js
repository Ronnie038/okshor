const Bsc = require('../models/Bcs');

exports.getBcsNewsSerivice = async (req) => {
	const queryData = req.query;
	let query = {};

	const category = queryData.category;
	const subcategory = queryData.subcategory;
	console.log(queryData);
	if (category) {
		query.category = category;
		// query.subcategory = subcategory;
	}
	if (category === 'all') query = {};

	const bcsNewses = await Bsc.find(query).sort({ updatedAt: -1 });

	return bcsNewses;
};
