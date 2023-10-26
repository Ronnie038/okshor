const Pdf = require('../models/Pdf');

const path = require('path');
const fs = require('fs'); // Import the 'fs' module
const { deleteImages } = require('../utils/deleteImages');

exports.createPdf = async (req, res) => {
	try {
		const pdfData = JSON.parse(req.body.pdfData);
		const pdfUrl = req.file.filename;
		pdfData.pdfUrl = pdfUrl;

		const createtedPdf = await Pdf.create(pdfData);

		console.log(createtedPdf);
		if (!createtedPdf) {
			return res.status(403).json({
				success: false,
				message: 'pdf does not created',
			});
		}
		res.status(200).json({
			success: true,
			data: pdfData,
		});
	} catch (error) {
		console.log(error.message);
		res.status(500).json({
			success: false,
			message: 'internal server error',
		});
	}
};

exports.getAllPdf = async (req, res) => {
	try {
		const allpdf = await Pdf.find({});
		const pdfCategories = await Pdf.distinct('category');

		if (!allpdf.length) {
			return res.status(403).json({
				success: false,
				message: 'No pdf found',
			});
		}

		res.status(200).json({
			success: true,
			data: allpdf,
			categories: pdfCategories,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: 'something went wrong',
		});
	}
};

exports.downloadPdf = async (req, res) => {
	// const pdf = '1696591892374-172817832-morsline.pdf';

	try {
		const { pdf } = req.query;
		const filePath = path.join(__dirname, '../my-pdf', pdf);

		// Check if the file exists
		const fileExists = await fs.promises
			.access(filePath, fs.constants.F_OK)
			.then(() => true)
			.catch(() => false);

		if (!fileExists) {
			res.status(404).json({ success: false, message: 'No file found' });
			return;
		}

		// Set the proper headers for PDF download
		const stat = await fs.promises.stat(filePath);
		// res.setHeader('Content-Length', stat.size);
		res.setHeader('Content-Type', 'application/pdf');
		// res.setHeader('Content-Disposition', `attachment; filename=${pdf}`);

		// Pipe the file to the response stream
		const fileStream = fs.createReadStream(filePath);

		fileStream.pipe(res);
		console.log('hello pdf');
	} catch (error) {
		console.error(error.message);
		res.status(500).json({
			success: false,
			message: 'Internal server error',
		});
	}
};

exports.deletePdfById = async (req, res) => {
	try {
		const pdfId = req.params.id;

		const pdf = await Pdf.findById(pdfId);
		if (!pdf) {
			return res.status(404).json({
				success: false,
				message: 'pdf not found',
			});
		}
		deleteImages([pdf.pdfUrl], 'my-pdf');
		// Find the product by ID and delete it
		const deletedPdf = await Pdf.findByIdAndDelete(pdfId);

		res.status(200).json({
			success: true,
			message: 'Pdf deleted',
		});
	} catch (error) {
		res.status(500).json({
			status: 'fail',
			message: 'An error occurred while deleting the pdf',
		});
	}
};
