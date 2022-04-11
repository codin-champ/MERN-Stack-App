var express = require("express");
var router = express.Router();
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

// Load User model
const Food = require("../models/food");
const Seller = require("../models/Vendors");
const Order = require("../models/Orders");

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
  Order.find({ shop: req.query.shop }).then((food) => {
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
  //   console.log(req.query.shop);
  console.log(req.query.name);
  Order.findOne({ name: req.query.name }).then((food) => {
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

router.get("/myorders", function (req, res) {
  // Food.find(function(err, users) {
  //     		if (err) {
  // 		console.log(err);
  // 	} else {
  // 		res.json(users);
  // 	}
  // })
  //   console.log(req.query.shop);
  console.log(req.query.name);
  Order.find({ user_name: req.query.name }).then((food) => {
    return res.json(food);
  });
});

// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request
// Add a user to db
router.post("/registerorder", async (req, res) => {
  //   try {
  //     // Get user input
  //     console.log(req.body);
  //     const { user_name, user_email, foodname, shop, status, quantity } =
  //       req.body;
  //     console.log(user_name);

  //     // Validate user input
  //     if (!(user_name && user_email && foodname && shop && status && quantity)) {
  //       res.status(400).send("All input is required");
  //     }

  //     // check if user already exist
  //     // Validate if user exist in our database
  //     // const oldUser = await Order.findOne({ name });
  //     // // const oldVendor = await Seller.findOne({ email });

  //     // if (oldUser) {
  //     //   return res
  //     //     .status(409)
  //     //     .send("Food Already Exist. Please delete before adding");
  //     // }
  //     // const stat = 0;
  //     // Create user in our database
  //     const user = await Order.create({
  //       user_name,
  //       user_email,
  //       foodname,
  //       shop,
  //       status,
  //       quantity,
  //     });

  //     // return new user
  //     res.status(201).json(user);
  //   } catch (err) {
  //     console.log(err);
  //   }
  const newOrder = new Order({
    user_email: req.body.user_email,
    user_name: req.body.user_name,
    foodname: req.body.foodname,
    shop: req.body.shop,
    status: req.body.status,
    quantity: req.body.quantity,
  });
  console.log(newOrder);
  newOrder
    .save()
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

// POST request
// Login
router.post("/reject", async (req, res) => {
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
    const { user_name, user_email, foodname, shop, status } = req.body;
    //reject status --> 100
    const deleteFood = await Order.findOne({ user_name, foodname });

    deleteFood.status = 100;
    console.log(deleteFood);

    if (deleteFood) {
      deleteFood
        .save()
        .then((deleteFood) => {
          res.json(deleteFood);
        })
        .catch((err) => {
          res.status(400).send(err);
        });
    }

    // res.json(deleteFood);
  } catch (err) {
    console.log(err);
  }
});

router.post("/next", async (req, res) => {
  try {
    // Get user input
    const { user_name, user_email, foodname, shop, status } = req.body;
    //reject status --> 100
    const deleteFood = await Order.findOne({ user_name, foodname });

    if (deleteFood.status < 40) {
      deleteFood.status = deleteFood.status + 10;
    } else {
      console.log("Order has already been completed");
    }
    console.log(deleteFood);

    if (deleteFood) {
      deleteFood
        .save()
        .then((deleteFood) => {
          res.json(deleteFood);
        })
        .catch((err) => {
          res.status(400).send(err);
        });
    }

    // res.json(deleteFood);
  } catch (err) {
    console.log(err);
  }
});

router.post("/pickup", async (req, res) => {
  try {
    // Get user input
    const { user_name, user_email, foodname, shop, status } = req.body;
    //reject status --> 100
    const deleteFood = await Order.findOne({ user_name, foodname });

    if (deleteFood.status == 30) {
      deleteFood.status = deleteFood.status + 10;
    } else {
      console.log("Order has not yet been Ready For pickup");
    }
    console.log(deleteFood);

    if (deleteFood) {
      deleteFood
        .save()
        .then((deleteFood) => {
          console.log(deleteFood);
          res.json(deleteFood);
        })
        .catch((err) => {
          res.status(400).send(err);
        });
    }

    // res.json(deleteFood);
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
