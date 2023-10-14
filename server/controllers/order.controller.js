const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");
const { orderService } = require("../services/order.service");
const { sendOrderConfirmationEmail } = require("../utils/ordermail");
const { ObjectId } = require("mongoose").Types;

const tran_id = new ObjectId().toString();

exports.getOrders = async (req, res) => {
  try {
    const userId = req.params.userId;
    const orders = await Order.find({ "user.id": userId })
      .select("-user")
      .sort({ updatedAt: -1 });
    if (orders.length < 1) {
      return res.status(204).json({
        status: "success",
        message: "You did't place any order",
      });
    }

    return res.status(200).json({
      status: "success",
      data: orders,
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({});

    return res.status(200).json({
      status: "success",
      data: orders,
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const orderData = req.body;
    const user = await User.findOne({ _id: orderData.userId });

    const order = await orderService(req);
    order.paymentMethod = "cash-on-deliviry";
    const newOrder = await Order.create(order);
    if (!newOrder) {
      return res.status(500).json({
        success: false,
        message: "Could not create an order",
      });
    }
    sendOrderConfirmationEmail(user, newOrder);
    sendOrderConfirmationEmail({ email: process.env.EMAIL }, newOrder);

    return res.status(200).json({
      success: true,
      message: "Successfully order placed",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error,
    });
  }
};

exports.getSingleOrder = async (req, res) => {
  try {
    const orderId = req.params.id; // Assuming the order ID is part of the URL

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found." });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "internal server error" });
  }
};
exports.updateOrder = async (req, res) => {
  try {
    const orderId = req.params.id; // Assuming the order ID is part of the URL
    const updateData = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(orderId, updateData, {
      new: true,
    });
    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found." });
    }
    res.status(200).json({ success: true, message: "status updated" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the order." });
  }
};
