const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = 4000;
const DB_NAME = "tutorial";

// routes
var testAPIRouter = require("./routes/testAPI");
var UserRouter = require("./routes/Users");
var VendorRouter = require("./routes/Vendors");
var Profile = require("./routes/Profile");
var Dashboard = require("./routes/Dashboard");
var FoodList = require("./routes/Food");
var FoodStatus = require("./routes/FoodStatus");
var Menu = require("./routes/menu");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connection to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/" + DB_NAME, {
  useNewUrlParser: true,
});
const connection = mongoose.connection;
connection.once("open", function () {
  console.log("MongoDB database connection established successfully !");
});

// setup API endpoints
app.use("/testAPI", testAPIRouter);
app.use("/user", UserRouter);
app.use("/vendor", VendorRouter);
app.use("/profile", Profile);
app.use("/dashboard", Dashboard);
app.use("/foodlist", FoodList);
app.use("/foodstatus", FoodStatus);
app.use("/menu", Menu);

app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});
