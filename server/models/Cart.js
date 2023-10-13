const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const CartItemSchema = new mongoose.Schema(
	{
		product: {
			type: ObjectId,
			ref: 'Product', // Reference to the Product model
			required: true,
		},
		quantity: {
			type: Number,
			required: true,
		},
	},
	{ _id: false } // Prevent Mongoose from creating a separate _id for each cart item
);

const CartSchema = new mongoose.Schema(
	{
		user: {
			type: ObjectId,
			ref: 'User', // Reference to the User model
			required: true,
		},
		items: [CartItemSchema], // An array of cart items
	},
	{
		timestamps: true,
	}
);

const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;
