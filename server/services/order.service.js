const Product = require("../models/Product");
const User = require("../models/User");

exports.orderService = async (req, tran_id) => {
  const order = req.body;
  const user = await User.findOne({ _id: order.userId });

  // const product = await Product.findOne({ _id: order.productId });
  // console.log(product);
  // product.price = product.oldPrice * order.quantity;

  const productOrder = {
    ...order,
    transactionId: tran_id ? tran_id : null,
    transactionId: tran_id,
    user: {
      id: user._id,
      name: user.name,
    },
    products: order.products,
  };

  return productOrder;
};
