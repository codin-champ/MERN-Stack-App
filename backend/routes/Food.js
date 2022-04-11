var express = require("express");
var router = express.Router();
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

// Load User model
const Food = require("../models/food");
const Seller = require("../models/Vendors");

// GET request
// Getting all the users
router.get("/", function (req, res) {
  // Food.find(function(err, users) {
  //     		if (err) {
  // 		console.log(err);
  // 	} else {
  // 		res.json(users);
  // 	}
  // })
  console.log(req.query.shop);
  Food.find({ shop: req.query.shop }).then((food) => {
    return res.json(food);
  });

  // 	Food.findOne({ shopname }).then(user => {
  // 	// Check if user email exists
  // 	if (!user) {
  // 		return res.status(400).json({
  // 			error: "Email not found",
  // 		});
  //     }
  //     else{
  //         res.send("Email Found");
  //         return user;
  //     }
  // });
});

router.get("/edit", function (req, res) {
  // Food.find(function(err, users) {
  //     		if (err) {
  // 		console.log(err);
  // 	} else {
  // 		res.json(users);
  // 	}
  // })
  console.log(req.query.shop);
  console.log(req.query.name);
  Food.findOne({ name: req.query.name, shop: req.query.shop }).then((food) => {
    return res.json(food);
  });

  // 	Food.findOne({ shopname }).then(user => {
  // 	// Check if user email exists
  // 	if (!user) {
  // 		return res.status(400).json({
  // 			error: "Email not found",
  // 		});
  //     }
  //     else{
  //         res.send("Email Found");
  //         return user;
  //     }
  // });
});

// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request
// Add a user to db
router.post("/registerfood", async (req, res) => {
  try {
    // Get user input
    const { name, shop, vegnveg, price } = req.body;
    console.log(name);

    // Validate user input
    if (!(name && shop && vegnveg && price)) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await Food.findOne({ name });
    // const oldVendor = await Seller.findOne({ email });

    if (oldUser) {
      return res
        .status(409)
        .send("Food Already Exist. Please delete before adding");
    }

    // Create user in our database
    const user = await Food.create({
      name,
      shop,
      vegnveg,
      price,
      rating: 0,
    });

    // return new user
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
});

// POST request
// Login
router.post("/delete", async (req, res) => {
  // const email = req.body.email;
  // // Find user by email
  // User.findOne({ email }).then(user => {
  // 	// Check if user email exists
  // 	if (!user) {
  // 		return res.status(404).json({
  // 			error: "Email not found",
  // 		});
  //       }
  //       else{
  //           res.send("Email Found");
  //           return user;
  //       }
  // });

  try {
    // Get user input
    const { name, shop, vegnveg, price, rating } = req.body;
    const deleteFood = await Food.deleteOne({ name });
    // user
    res.json(deleteFood);
  } catch (err) {
    console.log(err);
  }
});

router.post("/editfood", async (req, res) => {
  try {
    // Get user input
    const { name, shop, vegnveg, price, rating } = req.body;
    console.log(name);

    // Validate user input
    if (!name) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    let oldUser;
    await Food.findOne({ name }).then((food) => (oldUser = food));
    console.log(oldUser);

    if (oldUser) {
      // res.json(oldUser);
      oldUser.name = name;
      oldUser.vegnveg = vegnveg;
      oldUser.price = price;
      // oldUser.batchname = batchname;
      // oldUser.password = req.body.password;
      // res.json(oldUser);
      oldUser
        .save()
        .then((oldUser) => {
          res.json(oldUser);
        })
        .catch((err) => {
          res.status(400).send(err);
        });
    } else res.status(400).send("Invalid Name");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
