const mongoose = require('mongoose');
const validator = require('validator');

const BannerSchema = new mongoose.Schema(
	{
		title: {
			type: String,
		},
		category: String,
		categoryTitle: String,
		image: {
			type: String,
			required: true,
		},
	}
	// Prevent Mongoose from creating a separate _id for each cart item
);

const Banner = mongoose.model('Banner', BannerSchema);
module.exports = Banner;
