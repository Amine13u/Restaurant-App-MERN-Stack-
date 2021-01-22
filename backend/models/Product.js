const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    trim: true,
  },
  comment: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      text: {
        type: String,
        max: 300,
      },
    },
  ],
  rate: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      value: {
        type: Number,
        min: 0,
        max: 10,
        default: 1,
      },
    },
  ],
});

module.exports = mongoose.model("Product", productSchema);
