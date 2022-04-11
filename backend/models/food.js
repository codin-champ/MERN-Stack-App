const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const FoodSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	shop: {
		type: String,
		required: true
	},
	vegnveg:{
		type: String,
		required: true
	},
	price:{
		type: Number,
		required: true,
	},
	rating:{
		type: Number,
		required: true
	}
	 
});


module.exports = Food = mongoose.model("Food", FoodSchema);
// module.exports = Seller = mongoose.model("Seller", SellerSchema);