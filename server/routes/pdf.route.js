const express = require("express");
const router = express.Router();
const path = require("path");

const { pdfUploader } = require("../middleware/uploader");

const pdfController = require("../controllers/pdf.controller");

router
  .route("/")
  .post(pdfUploader.single("pdf"), pdfController.createPdf)
  .get(pdfController.getAllPdf);

router.route("/download").get(pdfController.downloadPdf);

router.route("/:id").delete(pdfController.deletePdfById);
module.exports = router;
