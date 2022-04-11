const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const OrderSchema = new Schema({
  user_name: {
    type: String,
    required: true,
  },
  user_email: {
    type: String,
    required: true,
  },
  foodname: {
    type: String,
    required: true,
  },
  shop: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

module.exports = Order = mongoose.model("Order", OrderSchema);
