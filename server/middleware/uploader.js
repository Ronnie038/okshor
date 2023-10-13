const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
	destination: 'images/',
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
		cb(null, uniqueSuffix + '-' + file.originalname);
	},
});

exports.uploader = multer({
	storage: storage,
	fileFilter: (req, file, cb) => {
		if (!file) {
			return cb();
		}
		const supportedImage = /\.(png|jpg|jpeg|webp)$/;
		const extension = path.extname(file.originalname);
		cb(null, true);
		// if (supportedImage.test(extension)) {
		//   cb(null, true);
		// } else {
		//   cb(new Error("Must be a png/jpg image"));
		// }
	},
	limits: {
		fileSize: 5000000,
	},
});

const pdfStorage = multer.diskStorage({
	destination: 'my-pdf/', // Change the destination directory to where you want to save PDFs
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
		cb(null, uniqueSuffix + '-' + file.originalname);
	},
});

exports.pdfUploader = multer({
	storage: pdfStorage,
	fileFilter: (req, file, cb) => {
		if (!file) {
			return cb();
		}
		const supportedPDF = /\.(pdf|jpg|jpeg|webp)$/;
		const extension = path.extname(file.originalname);
		if (supportedPDF.test(extension)) {
			cb(null, true);
		} else {
			cb(new Error('Must be a PDF file'));
		}
	},
	limits: {
		fileSize: 10000000, // 10 MB (adjust the size limit as needed)
	},
});
