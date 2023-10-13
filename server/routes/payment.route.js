const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const verifyToken = require('../middleware/verifyToken');

router.post('/process', verifyToken, paymentController.processPayment);
router.post('/success/:transId', paymentController.paymentSuccess);
router.post('/fail', paymentController.paymentFailure);
router.post('/cancel', paymentController.paymentCancel);
router.post('/ipn', paymentController.paymentIpn);

module.exports = router;
