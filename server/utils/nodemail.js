const nodemailer = require('nodemailer');

// Create a transporter using your email service's SMTP settings
const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.EMAIL,
		pass: process.env.MAIL_PASSWORD,
	},
});

/**
 *
 * @param {handling 2 defferent request} req
 * @param  {1:requesting for generate email verification link}
 * @param {2:requesting for generate forget password link}
 */
const mailHandler = async (req, res) => {
	const verificationToken = req?.user?._id.toString();
	const passwordResetToken = req?.resetToken;

	// Compose the verification link

	const forgetPasswordLink = `${process.env.CLIENT_URL}/user/forget-password?resetId=${passwordResetToken}`;
	const verifyEmailLink = `${process.env.APP_URL}/api/v1/user/verify/${verificationToken}`;

	const verificationLink = verificationToken
		? verifyEmailLink
		: forgetPasswordLink;

	// HTML template for the verification email
	// console.log(verificationLink);
	const emailTemplate = `
      <h1>${
				verificationToken ? 'Verify Your Email' : 'Reset your password'
			}</h1>
      <p>Click the link below to verify your email:</p>
      <a href="${verificationLink}">${
		verificationToken ? 'verify your email' : 'password reset link'
	}</a>
    `;

	try {
		// Email options
		const mailOptions = {
			from: process.env.EMAIL,
			to: req.body.email,
			subject: verificationToken ? 'Email Verification' : 'Forget Password',
			html: emailTemplate,
		};

		// Send the email
		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				console.error('Error sending email:', error);
				res.status(500).json({
					status: 'fail',
					error,
				});
			} else {
				if (req.url == '/login') {
					res.status(401).json({
						success: false,
						message: ' please check your email to verify',
					});
				} else {
					console.log('none login');
					res.status(200).json({
						success: true,
						message: verificationToken
							? ' please check your email to verify'
							: 'A confirmation message has been sent to your email',
					});
				}
			}
		});
	} catch (error) {
		res.status(500).json({
			status: 'fail',
			error,
		});
	}
};

module.exports = mailHandler;
