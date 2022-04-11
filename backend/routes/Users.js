var express = require("express");
var router = express.Router();
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

// Load User model
const User = require("../models/Users");
const Seller = require("../models/Vendors");

// GET request
// Getting all the users
router.get("/", function (req, res) {
  User.find(function (err, users) {
    if (err) {
      console.log(err);
    } else {
      res.json(users);
    }
  });
});

// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request
// Add a user to db
router.post("/registeruser", async (req, res) => {
  // const newUser = new User({
  //     name: req.body.name,
  //     email: req.body.email,
  //     contactnumber: req.body.contactnumber,
  //     age: req.body.age,
  //     batchname: req.body.batchname,
  //     password: req.body.password
  // });

  // // Add error handling if user already exists

  // console.log(newUser.name);

  // newUser.save()
  //     .then(user => {
  //         res.status(200).json(user);
  //     })
  //     .catch(err => {
  //         res.status(400).send(err);
  //     });

  try {
    // Get user input
    const { name, email, contactnumber, age, batchname, password } = req.body;
    console.log(name);

    // Validate user input
    if (!(name && email && contactnumber && age && batchname && password)) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email });
    const oldVendor = await Seller.findOne({ email });

    if (oldUser || oldVendor) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      name,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      contactnumber,
      age,
      batchname,
      password: encryptedPassword,
      money: 0,
    });

    // Create token
    const token = jwt.sign({ user_id: user._id, email }, "cdmskvnkd", {
      expiresIn: "2h",
    });
    // save user token
    user.token = token;

    // return new user
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
});

// router.post("/registervendor",  async (req, res) => {
//   // vendor
//   try {
//     // Get Vendor input
//     const { name, shopname, email, contactnumber, password } = req.body;
//         console.log(name);

//     // Validate user input
//     if (!(name && shopname && email && contactnumber && password)) {
//       res.status(400).send("All input is required");
//     }

//     // check if user already exist
//     // Validate if user exist in our database
//     const oldUser = await Seller.findOne({ email });

//     if (oldUser) {
//       return res.status(409).send("Vendor Already Exist. Please Login");
//     }

//     //Encrypt user password
//     encryptedPassword = await bcrypt.hash(password, 10);

//     // Create user in our database
//     const user = await Seller.create({
//         name,
//         shopname,
//         email: email.toLowerCase(), // sanitize: convert email to lowercase
//         contactnumber,
//         password: encryptedPassword,
//     });

//     // Create token
//     const token = jwt.sign(
//       { user_id: user._id, email },
//        "cdmskvnkd",
//       {
//         expiresIn: "2h",
//       }
//     );
//     // save user token
//     user.token = token;

//     // return new user
//     res.status(201).json(user);
//   } catch (err) {
//     console.log(err);
//   }
// });

// POST request
// Login
router.post("/login", async (req, res) => {
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
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign({ user_id: user._id, email }, "cdmskvnkd", {
        expiresIn: "2h",
      });

      // save user token
      user.token = token;

      // user
      res.json(user);
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
