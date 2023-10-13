const mongoose = require('mongoose');
const validator = require('validator');
const { ObjectId } = mongoose.Schema.Types;

const categrySchema = mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			required: [true, 'please provide a category name'],
			lowercase: true,
			unique: true,
		},
		subcategories: Array,
	},
	{
		timestamps: true,
	}
);

const Category = mongoose.model('Category', categrySchema);

module.exports = Category;
