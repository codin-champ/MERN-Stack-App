const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema


const SellerSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	shopname: {
		type: String,
		required: true,
		unique: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	contactnumber:{
		type: String,
		required: true
	},
	password:{
		type: String,
		required: true
	}
});


// mosdule.exports = User = mongoose.model("User", UserSchema);
module.exports = Seller = mongoose.model("Seller", SellerSchema);