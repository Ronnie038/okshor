const SSLCommerzPayment = require("sslcommerz-lts");
const Product = require("../models/Product");
const Order = require("../models/Order");
const User = require("../models/User");
const { orderService } = require("../services/order.service");
const { sendOrderConfirmationEmail } = require("../utils/ordermail");
const { ObjectId } = require("mongoose").Types;

const tran_id = new ObjectId().toString();

exports.processPayment = async (req, res) => {
  try {
    // console.log(newOrder);
    const orderData = req.body;
    const user = await User.findOne({ _id: orderData.userId });

    const order = await orderService(req, tran_id);
    const category = order.categories.join(",");

    const paymentData = {
      total_amount: order.price,
      currency: "BDT",
      tran_id: tran_id, // use unique tran_id for each api call
      success_url: `${process.env.APP_URL}/api/v1/payment/success/${tran_id}`,
      fail_url: `${process.env.APP_URL}/api/v1/payment/fail`,
      cancel_url: `${process.env.APP_URL}/api/v1/payment/cancel`,
      ipn_url: `${process.env.APP_URL}/api/v1/payment/ipn`,
      shipping_method: "Courier",
      product_name: "Computer.",
      product_category: category,
      product_profile: "general",
      cus_name: "Customer Name",
      cus_email: order.email,
      cus_add1: "Dhaka",
      cus_add2: "Dhaka",
      cus_city: "Dhaka",
      cus_state: "Dhaka",
      cus_postcode: "",
      cus_country: "Bangladesh",
      cus_phone: order.contactNumber,
      cus_fax: "01711111111",
      ship_name: "Customer Name",
      ship_add1: "Dhaka",
      ship_add2: "Dhaka",
      ship_city: "Dhaka",
      ship_state: "Dhaka",
      ship_postcode: 1000,
      ship_country: "Bangladesh",
    };

    const sslcommer = new SSLCommerzPayment(
      process.env.SANDBOX_STORE_ID,
      process.env.SANDBOX_STORE_PASSWORD,
      false
    ); //true for live default false for sandbox

    sslcommer.init(paymentData).then(async (data) => {
      if (data?.GatewayPageURL) {
        const newOrder = await Order.create(order);
        sendOrderConfirmationEmail(user, newOrder);
        return res.status(200).json({
          gatewayURL: data.GatewayPageURL,
        });
      } else {
        return res.status(400).json({
          data,
          message: "Session was not successful",
        });
      }
      //process the response that got from sslcommerz
      //https://developer.sslcommerz.com/doc/v4/#returned-parameters
    });
  } catch (error) {
    console.error("Payment error:", error);
    res.status(500).send("Payment error");
  }
};

exports.paymentSuccess = async (req, res, next) => {
  const transId = req?.params?.transId;
  const succesOrder = await Order.findOneAndUpdate(
    { transactionId: transId },
    { $set: { paidStatus: true } },
    {
      new: true,
    }
  );

  if (succesOrder.paidStatus) {
    return res.redirect(`${process.env.CLIENT_URL}/payment/success/${transId}`);
  }
};
exports.paymentFailure = async (req, res, next) => {
  return res.redirect(`${process.env.CLIENT_URL}/payment/fail`);
};

exports.paymentCancel = async (req, res, next) => {
  return res.redirect(`${process.env.CLIENT_URL}/payment/cancel`);
};

exports.paymentIpn = async (req, res, next) => {
  return res.status(400).json({
    data: req.body,
  });
};
