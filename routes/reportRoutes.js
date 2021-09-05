const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();

var User = require("../models/User");
var Sales = require("../models/Sales");
var Collection = require("../models/Collection");
var Stock = require("../models/Stock");
var Correctionlog = require("../models/CorrectionLog");

//endpoint for login functionality and authentication
router.route("/login").post((req, res) => {
  const name = req.body.username;
  const password = req.body.password;

  if (name === "" || password === "") {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  User.findOne({ username: name })
    .then((foundUser) => {
      if (foundUser.password != password) {
        return res.status(400).json({ msg: "Invalid credentials" });
      }

      jwt.sign(
        { id: foundUser._id },
        process.env.ACCESS_TOKEN_SECRET,
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: {
              id: foundUser._id,
              username: foundUser.username,
            },
          });
        }
      );
    })
    .catch((err) => {
      return res.status(400).json({ msg: "User does not exist" });
    });
});

//Setting up api endpoint for getting vegetable sales detail
router.route("/ccsales").get((req, res) => {
  var ccid = req.query.ccid;
  var veg_category = req.query.category;
  Sales.findOne({ cc_id: ccid, category: veg_category }).then((foundDoc) =>
    res.json(foundDoc)
  );
});

//Setting up api endpoint for getting vegetable collection detail

router.route("/cccollection").get((req, res) => {
  var ccid = req.query.ccid;
  var veg_category = req.query.category;
  Collection.findOne({ cc_id: ccid, category: veg_category }).then((foundDoc) =>
    res.json(foundDoc)
  );
});

//Fetch current stock(endpoint)

router.route("/cstock").get((req, res) => {
  var ccid = req.query.ccid;
  Stock.findOne({ type_id: req.query.ccid, category: req.query.category }).then(
    (foundDoc) => res.json(foundDoc)
  );
});

//Updating sales db (endpoint)

router.route("/ccsales").post((req, res) => {
  var ccid = req.body.ccid;
  var veg_category = req.body.category;

  Sales.updateOne(
    { cc_id: ccid, category: veg_category },
    {
      $set: {
        items: req.body.data,
      },
    }
  ).catch((err) => console.log(err));
});

//Updating collection db(endpoint)
router.route("/cccollection").post((req, res) => {
  var ccid = req.body.ccid;
  var date = new Date();
  var veg_category = req.body.category;

  Collection.updateOne(
    { cc_id: ccid, category: veg_category },
    {
      $set: {
        items: req.body.data,
      },
    }
  ).catch((err) => console.log(err));
});

//Update stock by posting new stock value after edit.
router.route("/cstock").post((req, res) => {
  let data = req.body.data;
  Stock.updateOne(
    { cc_id: req.body.ccid, category: req.body.category },
    {
      $set: {
        item_stock: data,
      },
    }
  ).catch((err) => console.log(err));
});

//Getting correction history
router.route("/clogs").get((req, res) => {
  Correctionlog.findOne({ cc_is: req.query.ccid });
  
});

//Updating correction logs
router.route("/clogs").post((req, res) => {
  let obj = {};
  let data = req.body.data;

  obj["date"] = new Date();
  obj["logs"] = data;

  Correctionlog.updateOne(
    { cc_id: req.body.ccid },
    {
      $push: {
        detail: { $each: [obj] },
      },
    }
  ).catch((err) => console.log(err));
});

module.exports = router;
