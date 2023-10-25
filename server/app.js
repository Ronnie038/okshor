const express = require('express');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');

require('./config/passport');
const app = express();

// Middleware
app.use('/images', express.static('images'));
// app.use('/pdfs', express.static('my-pdf'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
// app.use(cors());

app.use(
	session({
		secret: process.env.ACCESS_TOKEN_SECRET, // Change this to a secure secret key
		resave: false,
		saveUninitialized: true,
		cookie: {
			secure: false, // Set to true in a production environment with HTTPS
			httpOnly: true,
			// domain:'hosted domain url',

			expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
			path: '/',
		},
	})
);

app.use(passport.initialize());
app.use(passport.session());

// let allowedOrigins = [];

// if (process.env.NODE_ENV === 'development') {
// 	// Development environment
// 	allowedOrigins = ['http://localhost:5173'];
// } else {
// 	// Production environment
// 	// allowedOrigins = ["https://it-product-client.netlify.app"];
// }

app.use(
	cors({
		origin: ['http://localhost:5173'],
		methods: 'GET,POST,PUT,DELETE',
		credentials: true,
	})
);

// Routes
const userRoute = require('./routes/user.route');
const paymentRoute = require('./routes/payment.route');
const orderRoute = require('./routes/order.route');
const productRoute = require('./routes/product.route');
const newsRoute = require('./routes/news.route');
const pdfRoute = require('./routes/pdf.route');
const bcsNewsRoute = require('./routes/bscNews.route');
const bannerRoutes = require('./routes/banner.route');
const contactMail = require('./utils/contactMail');

// mailRoute
app.post('/api/v1/contact', async (req, res) => {
	try {
		const userData = req.body;
		contactMail(userData);

		console.log(userData);

		res.status(200).json({
			success: true,
			message: 'message sent',
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
});
// Root route

app.get('/', (req, res) => {
	return res.send('hello from behind');
});

// API Routes
app.use('/api/v1/user', userRoute);
app.use('/api/v1/payment', paymentRoute);
app.use('/api/v1/order', orderRoute);
app.use('/api/v1/products', productRoute);
app.use('/api/v1/news', newsRoute);
app.use('/api/v1/pdf', pdfRoute);
app.use('/api/v1/bcsNews', bcsNewsRoute);
app.use('/api/v1/banner', bannerRoutes);

// Error handling middleware
// app.use((err, req, res, next) => {
// 	console.error(err.stack);
// 	res.status(500).send('Something broke!');
// });

module.exports = app;
