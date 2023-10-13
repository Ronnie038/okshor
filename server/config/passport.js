const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

passport.use(
	new FacebookStrategy(
		{
			clientID: process.env.FACEBOOK_CLIENT_ID,
			clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
			callbackURL: '/api/v1/user/facebook/callback',
			profileFields: ['id', 'displayName', 'photos', 'email'],
		},
		async (accessToken, refreshToken, profile, done) => {
			try {
				let user = await User.findOne({ facebookId: profile.id });

				const newUser = {
					name: profile?.displayName,
					facebookId: profile.id,
					isVerified: true,
					image: profile?.photos[0].value,
				};

				if (!user) {
					user = await User.create(newUser);
					// Since facebook login is verified
					// ... other relevant data
				}
				// console.log(user);
				return done(null, user);
				// Handle Facebook login and user creation/update
				// ... (similar to the logic in the previous examples)
			} catch (error) {
				console.error('Error in google strategy:', error);
				return done(error, false);
			}
		}
	)
);

// google

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: '/api/v1/user/google/callback',
			scope: ['profile', 'email'],
		},
		async (accessToken, refreshToken, profile, done) => {
			try {
				let user = await User.findOne({ email: profile.emails[0].value });

				const newUser = {
					name: profile?.displayName,
					email: profile?.emails[0].value,
					isVerified: profile?.emails[0].verified,
					image: profile?.photos[0].value,
				};

				if (!user) {
					user = await User.create(newUser);
					// Since Google login is verified
					// ... other relevant data
				}

				return done(null, user);
				// Handle Facebook login and user creation/update
				// ... (similar to the logic in the previous examples)
			} catch (error) {
				// console.error('Error in google strategy:', error.message);
				return;
			}
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});
