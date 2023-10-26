const { signupService, findUserByEmail } = require('../services/user.service');
const { generateToken } = require('../utils/token');
const User = require('../models/User');

// User Signup
exports.signup = async (req, res, next) => {
	try {
		const isUserExist = await User.findOne({ email: req.body.email });

		if (!isUserExist) {
			const user = await signupService(req.body);
			req.user = user;
			return next();
		}

		if (!isUserExist.isVerified) {
			req.user = isUserExist;
			return next();
		}

		return res.status(409).json({
			success: false,
			message: 'You already have an account. Please log in.',
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			success: false,
			message: 'Internal server error',
		});
	}
};

// User Login
const cookie = require('cookie');
const { deleteImages } = require('../utils/deleteImages');

exports.login = async (req, res, next) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(401).json({
				success: false,
				message: 'Please provide your credentials',
			});
		}

		const user = await findUserByEmail(email);

		if (!user) {
			return res.status(401).json({
				success: false,
				message: 'No user found. Please create an account',
			});
		}

		const isPasswordValid = user.comparePassword(password, user.password);

		if (!isPasswordValid) {
			return res.status(401).json({
				success: false,
				message: 'Invalid credentials',
			});
		}

		if (!user.isVerified) {
			req.user = user;
			return next();
		}

		const token = generateToken(user);
		const { password: pwd, ...other } = user.toObject();

		// const jwtCookieOptions = {
		// 	// httpOnly: true, // Make the cookie accessible only through HTTP
		// 	secure: true, // Set to 'true' in a production environment with HTTPS
		// 	// sameSite: 'strict', // Set a reasonable same-site policy
		// 	maxAge: 7 * 24 * 60 * 60 * 1000, // Expiration time in milliseconds (1 week)

		// };

		// const jwtCookie = cookie.serialize('loginSession', token, jwtCookieOptions);

		// res.setHeader('Set-Cookie', jwtCookie);
		if (process.env.NODE_ENV === 'production') {
			res.cookie('loginSession', token, {
				httpOnly: true,
				sameSite: 'none',
				secure: true,
				// domain: 'https://it-product-client.netlify.app',
				// path: 'login',
			});
		} else {
			res.cookie('loginSession', token, { httpOnly: true });
		}

		res.status(200).json({
			success: true,
			message: 'Successfully logged in',
			data: {
				user: other,
				token,
			},
		});
	} catch (error) {
		console.error(error.message);
		res.status(500).json({
			success: false,
			message: 'Internal server error',
		});
	}
};

// User Logout
exports.logOut = (req, res) => {
	res?.clearCookie('loginSession');
	res?.clearCookie('session');
	if (!req.logout)
		return res.status(200).json({
			success: true,
		});
	req.logout(function (err) {
		if (err) {
			console.error(err);
			return res.status(500).json({
				success: false,
				message: 'Internal server error',
			});
		}
		res.send('DONE');
	});
};

exports.resetPassword = async (req, res, next) => {
	try {
		const email = req.body.email;
		console.log(email);
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(401).json({
				status: 'fail',
				message: 'this email does not have an account please create an account',
			});
		}
		const token = generateToken(user, '30m');

		const updatedUser = await User.findOneAndUpdate(
			{ email },
			{ passwordResetToken: token },
			{
				upsert: true, // Set to true to enable upsert behavior
				new: true, // Return the modified document after update
				runValidators: true,
			}
		);

		req.resetToken = updatedUser.passwordResetToken;
		next();
	} catch (error) {
		console.log(error);
		res.status(500).json({
			success: false,
			message: 'internal server error',
		});
	}
};

exports.forgetPassword = async (req, res) => {
	try {
		const passwordResetToken = req?.params?.resetToken;

		const user = await User.findOne({ passwordResetToken });
		if (!user) {
			return res.status(401).json({
				success: false,
				message: 'Already passport changed with this link',
			});
		}
		const hashedPassword = user.createHashedPassword(req.body.password);

		const resetPasswordUser = await User.findOneAndUpdate(
			{
				passwordResetToken,
			},
			{ passwordResetToken: '', password: hashedPassword },
			{ new: true }
		);

		res.status(200).json({
			success: true,
			message: 'Password successfully changed',
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			status: 'fail',
			error,
		});
	}
};

exports.updateUser = async (req, res) => {
	try {
		const _id = req.params.id;
		let updateData;
		let image;
		const user = await User.findById(_id);

		if (req.file) {
			if (user.image) {
				deleteImages([user.image]);
			}
			updateData = JSON.parse(req.body.profile); // Updated data from the request body
			const imageUrl = `${process.env.APP_URL}/images/${req.file.filename}`;

			updateData.image = imageUrl;
		} else {
			updateData = req.body;
		}
		console.log(updateData, _id);

		// Find the user by ID and update it
		const updatedProfile = await User.findByIdAndUpdate(_id, updateData, {
			new: true,
		});
		res.status(200).json({
			success: true,
			message: 'profile updated',
			data: updatedProfile,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: 'internal server errro',
		});
	}
};

exports.getMe = async (req, res) => {
	try {
		let user;
		const facebookId = req.user.facebookId;
		if (facebookId) {
			user = await User.findOne({ facebookId });
		} else {
			user = await findUserByEmail(req.user?.email);
		}
		const { password: pwd, ...other } = user.toObject();

		return res.status(200).json({
			success: true,
			user: other,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			error,
		});
	}
};

exports.verifyUser = async (req, res) => {
	const verifyContent = `
    <html>
      <head>
        <title>Verify email</title>
      </head>
      <body>
        <h1 style="text-align:center;color:white; margin:3rem auto 0 auto;background-color:green;width:300px;padding:50px;">Email verified</h1>
		<div className="" style="text-align:center">
		<a href="${process.env.REACT_APP_LOGIN_URL}" target="_blank" style="text-align:center;color:white; margin:3rem auto 0 auto;background-color:red;padding:20px;text-decoration:none;font-size:20px;font-weight:bold">Go to login page</a>
		</div>

        
      </body>
    </html>
  `;
	try {
		const userId = req.params.verificationToken;

		// console.log(userId);

		const verifyUser = await User.updateOne(
			{ _id: userId },
			{ isVerified: true },
			{ new: true }
		);

		res.send(verifyContent);
	} catch (error) {
		res.status(500).send('Something went wrong');
	}
};
