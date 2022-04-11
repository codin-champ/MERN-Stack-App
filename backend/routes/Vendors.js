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

// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request 
// Add a user to db


router.post("/registervendor",  async (req, res) => {
  // vendor
  try {
    // Get Vendor input
    const { name, shopname, email, contactnumber, password } = req.body;
        console.log(name);

    // Validate user input
    if (!(name && shopname && email && contactnumber && password)) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await Seller.findOne({ email });
    const oldVendor = await User.findOne({ email });

    if (oldUser || oldVendor) {
      return res.status(409).send("Vendor Already Exist. Please Login");
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const seller = await Seller.create({
        name,
        shopname,
        email: email.toLowerCase(), // sanitize: convert email to lowercase
        contactnumber,
        password: encryptedPassword
    });

    // Create token
    const token = jwt.sign(
      { seller_id: seller._id, email },
       "cdmskvnkd",
      {
        expiresIn: "2h",
      }
    );
    // save user token
    seller.token = token;

    // return new user
    res.status(201).json(seller);
  } catch (err) {
    console.log(err);
  }
});


// POST request 
// Login

router.post("/login", async (req, res) => {
	try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const seller = await Seller.findOne({ email });

    if (seller && (await bcrypt.compare(password, seller.password))) {
      // Create token
      const token = jwt.sign(
        { seller_id: seller._id, email },
        "cdmskvnkd",
        {
          expiresIn: "2h",
        }
      );

      // save user token
      seller.token = token;

      // user
      res.json(seller);
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
