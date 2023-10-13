const mongoose = require('mongoose');
require('dotenv').config();

const app = require('./app');

const port = process.env.PORT || 5000;

// database connection
mongoose
	.connect(process.env.DATABASE_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('Database Connected');
	})
	.catch((error) => {
		console.error('Database Connection Error:', error);
	});

// Handle graceful shutdown of the database connection on application exit
process.on('SIGINT', async () => {
	try {
		await mongoose.connection.close();
		console.log('Database Connection Closed Gracefully');
		process.exit(0);
	} catch (err) {
		console.error('Error closing database connection:', err);
		process.exit(1);
	}
});

app.listen(port, () => {
	console.log(`App is running on port ${port} origin ${process.env.NODE_ENV}`);
});
