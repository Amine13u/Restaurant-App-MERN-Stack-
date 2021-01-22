const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  address_1: {
    type: String,
    required: true,
  },
  address_2: {
    type: String,
  },
  //   orders: [
  //     {
  //       order: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
  //     },
  //   ],
});

module.exports = Profile = mongoose.model("Profile", ProfileSchema);
