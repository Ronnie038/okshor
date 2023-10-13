const jwt = require('jsonwebtoken');

exports.generateToken = (userInfo, expire = '7d') => {
	const payload = {
		email: userInfo.email,
		role: userInfo.role,
	};
	const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: expire,
	});

	return token;
};
