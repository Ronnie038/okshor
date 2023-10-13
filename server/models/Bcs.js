const mongoose = require('mongoose');
const validator = require('validator');

const bcsScheam = new mongoose.Schema(
	{
		title: { type: String, required: [true, 'please provide a title'] },
		category: {
			type: String,
			required: [true, 'please provide a category'],
		},
		subcategory: {
			type: String,
			required: [true, 'Please add a Sub Category'],
		},
		image: {
			type: String,
			required: [true, 'please provide a image'],
			// validate: {
			// 	validator: (value) => {
			// 		return validator.isURL(value);
			// 	},
			// 	message: 'please provide valid image url',
			// },
		},
		description: {
			type: String,
			required: [true, 'please provide a description'],
		},
	},
	{
		timestamps: true,
	}
);

const Bcs = mongoose.model('Bcs', bcsScheam);
module.exports = Bcs;
