const mongoose = require('mongoose');
const validator = require('validator');
const { ObjectId, Mixed } = mongoose.Schema.Types;

// schema design

const productSchema = mongoose.Schema(
	{
		title: {
			type: String,
			required: [true, 'Please provide a name for this product.'],
			trim: true,
			lowercase: true,
		},
		description: {
			type: String,
			required: [true, 'Please provide a description for this product.'],
		},
		regularPrice: {
			type: Number,
			required: [true, 'Please provide a price for this product.'],
		},
		offerPrice: {
			type: Mixed,
			default: null,
		},
		offerPercentage: {
			type: Mixed,
			default: null,
		},
		discountPrice: {
			type: Mixed,
		},

		stock: {
			type: Mixed,
		},
		// brand: String,
		sku: {
			type: String,
		},

		imageUrls: [
			{
				type: String,
				required: [true, 'Please provide the img urls'],
			},
		],
		image: String,

		status: {
			type: String,
			enum: ['in-stock', 'out-of-stock'],
			default: 'in-stock',
		},

		newest: Boolean,
	},
	{
		timestamps: true,
	}
);

// mongoose middleweares for saving data:pre / post
productSchema.pre('save', function (next) {
	console.log('before saving data');
	if (this.quantity == 0) {
		this.status = 'out-of-stock';
	}
	next();
});

// productSchema.post('save', function (doc, next) {
// 	console.log('After saving data', doc);
// 	next();
// });

//| creating instance on prodcut
// productSchema.methods.logger = function () {
// 	console.log(`Data saved for ${this.name}`);
// };

// SCHEMA --> MODEL----> query
const Product = mongoose.model('Products', productSchema);

module.exports = Product;
