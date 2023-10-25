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
const contactMail = async (userData) => {
	// Compose the verification link

	const emailTemplate = `
		<span>from: ${userData.email}</span>
      <p>${userData.message} </p>
    `;

	// Email options
	const mailOptions = {
		from: userData.email,
		to: process.env.EMAIL,
		subject: `Message From Okshar User ${userData.name}`,
		html: emailTemplate,
	};

	// Send the email
	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.error('Email sending failed:', error);
		} else {
			console.log('Email sent:', info.response);
		}
	});
};

module.exports = contactMail;
