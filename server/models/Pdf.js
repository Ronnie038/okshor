const mongoose = require('mongoose');

const pdfSchema = mongoose.Schema(
	{
		title: {
			type: String,
			required: [true, 'please provide the title of  pdf'],
		},
		category: String,
		description: {
			type: String,
			required: [true, 'please provide the description'],
		},
		pdfUrl: {
			type: String,
			required: [true, 'please provide your pdf'],
		},
	},
	{
		timestamps: true,
	}
);

const Pdf = new mongoose.model('Pdf', pdfSchema);
module.exports = Pdf;
