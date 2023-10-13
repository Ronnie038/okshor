const mongoose = require('mongoose');
// const { ObjectId } = mongoose.Schema.Types;
const validator = require('validator');
var bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
	{
		email: {
			type: String,
			trim: true,
			lowercase: true,
			// unique: true,
			// required: [true, 'Email is Required'],
		},
		password: {
			type: String,
			// required: [true, 'Password is required'],
		},
		confirmPassword: {
			type: String,
			// required: [true, 'Please confirm your password'],
			validate: {
				validator: function (value) {
					return value === this.password;
				},
				message: "Password don't match",
			},
		},
		isVerified: {
			type: Boolean,
			default: false,
		},
		role: {
			type: String,
			enum: ['user', 'admin'],
			default: 'user',
		},
		isAdmin: {
			type: Boolean,
			default: false,
		},
		name: {
			type: String,
			// required: [true, "Please provide firstname"],
			trim: true,
			minLength: [3, 'Name must at least 3 character'],
			maxLength: [50, 'name is too large'],
		},

		phone: String,

		shippingAddress: String,

		image: {
			type: String,
			validate: [validator.isURL, 'Please provide a valid url'],
		},
		facebookId: String,
		passwordChangedAt: Date,
		passwordResetToken: String,
		passwordResetExpires: Date,
	},
	{ timestamps: true }
);

userSchema.pre('save', function (next) {
	const password = this.password;
	if (password) {
		const hashedPassword = bcrypt.hashSync(password);

		this.password = hashedPassword;
		this.confirmPassword = undefined;
		next();
	} else {
		next();
	}
});

userSchema.methods.comparePassword = function (password, hash) {
	const isPasswordValid = bcrypt.compareSync(password, hash);
	return isPasswordValid;
};
userSchema.methods.createHashedPassword = function (password) {
	const hashedPassword = bcrypt.hashSync(password);
	return hashedPassword;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
