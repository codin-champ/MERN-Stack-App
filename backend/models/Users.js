const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contactnumber: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  batchname: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    require: true,
  },
  money: {
    type: Number,
    require: true,
  },
});

// const SellerSchema = new Schema({
// 	name: {
// 		type: String,
// 		required: true
// 	},
// 	shopname: {
// 		type: String,
// 		required: true,
// 		unique: true
// 	},
// 	email: {
// 		type: String,
// 		required: true,
// 		unique: true
// 	},
// 	contactnumber:{
// 		type: String,
// 		required: true
// 	},
// 	password:{
// 		type: String,
// 		required: true
// 	}
// });

module.exports = User = mongoose.model("User", UserSchema);
// module.exports = Seller = mongoose.model("Seller", SellerSchema);
