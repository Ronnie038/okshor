const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const verifyToken = require('../middleware/verifyToken');
const authorization = require('../middleware/authorization');

router.post('/', verifyToken, orderController.createOrder);
router.get(
	'/',
	verifyToken,
	authorization('admin'),
	orderController.getAllOrders
);
router.get('/:userId', verifyToken, orderController.getOrders);
router.get('/single/:id', verifyToken, orderController.getSingleOrder);

router.put(
	'/:id',
	verifyToken,
	authorization('admin'),
	orderController.updateOrder
);

module.exports = router;
