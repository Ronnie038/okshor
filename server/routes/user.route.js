const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controllers/user.controller');
const verifyMailSend = require('../utils/nodemail');
const verifyToken = require('../middleware/verifyToken');
const { uploader } = require('../middleware/uploader');

// Authentication Routes
router.post('/signup', userController.signup, verifyMailSend);
router.post('/login', userController.login, verifyMailSend);
router.get('/logout', userController.logOut);

// User Profile Routes
router.get('/profile', verifyToken, userController.getMe);
router.put(
	'/:id',
	verifyToken,
	uploader.single('image'),
	userController.updateUser
);

// Facebook Login Routes
router.get(
	'/facebook',
	passport.authenticate('facebook', {
		scope: ['id', 'displayName', 'photos', 'email'],
	})
);
router.get(
	'/facebook/callback',
	passport.authenticate('facebook', {
		successRedirect: `${process.env.CLIENT_URL}/`,
		failureRedirect: '/api/v1/user/login/failed',
	})
);

// Google Login Routes
router.get(
	'/google',
	passport.authenticate('google', { scope: ['profile', 'email'] })
);
router.get(
	'/google/callback',
	passport.authenticate('google', {
		successRedirect: `${process.env.CLIENT_URL}/login`,
		failureRedirect: '/api/v1/user/login/failed',
	})
);

// Password Reset Routes
router.post('/reset-password', userController.resetPassword, verifyMailSend);
router.post('/forget-password/:resetToken', userController.forgetPassword);

// User Email Verification Route
router.get('/verify/:verificationToken', userController.verifyUser);

// Error Handling Middleware
router.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({
		status: 'error',
		message: 'Internal Server Error',
	});
});

module.exports = router;
