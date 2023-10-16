const mongoose = require('mongoose');
const { default: validator } = require('validator');

const NewsSchema = new mongoose.Schema(
	{
		title: String,
		description: String,
		mainDescription: String,

		image: {
			type: String,
			required: [validator.isURL('', true), 'Please provide a valid url'],
		},
		categoryTitle: String,
		category: String,
		video: String,
	},
	{
		timestamps: true,
	}
);

const News = mongoose.model('News', NewsSchema);

module.exports = News;
