const fs = require('fs');
const path = require('path');

exports.deleteImages = async (fileUrls, filePath) => {
	for (const fileUrl of fileUrls) {
		// Extract the filename from the URL
		let filename;
		if (filePath == 'images') {
			filename = path.basename(new URL(fileUrl).pathname);
		} else {
			filename = fileUrl;
		}
		// Construct the file path on your server
		const filePathDerectory = path.join(filePath, filename);

		fs.unlink(filePathDerectory, (err) => {
			if (err) {
				console.error(`Error deleting image ${filename}: ${err}`);
			} else {
				console.log(`file ${filename} deleted successfully.`);
			}
		});
	}
};
