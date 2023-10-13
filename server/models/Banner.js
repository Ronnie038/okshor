const mongoose = require("mongoose");
const validator = require("validator");

const BannerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    category: String,
    image: {
      type: String,
      required: true,
    },
    megaOffer: { type: Boolean, default: false },
    offerDate: String,
  }
  // Prevent Mongoose from creating a separate _id for each cart item
);

const Banner = mongoose.model("Banner", BannerSchema);
module.exports = Banner;
