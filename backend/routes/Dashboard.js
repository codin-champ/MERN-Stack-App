var express = require("express");
var router = express.Router();
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

// Load User model
const User = require("../models/Users");
const Seller = require("../models/Vendors")

// GET request 
// Getting all the users
router.get("/", function(req, res) {
    User.find(function(err, users) {
		if (err) {
			console.log(err);
		} else {
			res.json(users);
		}
	})
});

 
// POST request 
// Add a user to db
router.post("/user",  async (req, res) => {
    

    try {
    // Get user input
    const { email } = req.body;
        console.log(email);

    // Validate user input
    if (!(email)) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email });

    if (oldUser) {
        res.json(oldUser);
    }
    else
    res.status(400).send("Invalid Email");

  } catch (err) {
    console.log(err);
  }

});



// POST request 
// Login
router.post("/vendor", async (req, res) => {

  try {
    // Get user input
    const { email } = req.body;
        console.log(email);

    // Validate user input
    if (!(email)) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await Seller.findOne({ email });

    if (oldUser) {
        res.json(oldUser);
    }
    else{
        res.status(400).send("Invalid Email")
    }

  } catch (err) {
    console.log(err);
  }
});

module.exports = router;

