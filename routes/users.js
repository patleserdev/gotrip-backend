var express = require("express");
var router = express.Router();
const User = require("../models/users.js");
const { checkBody } = require("../modules/checkBody.js");

/**
 * Return users
 */
router.get("/", async function (req, res, next) {
  const users = await User.find();
  res.json({ result: true, datas: users });
});

/**
 * Return user ID
 */
router.get("/:id", async function (req, res, next) {
  if (req.params.id) {
    const user = await User.findOne({ _id: req.params.id });
    res.json({ result: true, datas: user });
  }
});

/**
 * Add user
 */
router.post("/", async function (req, res, next) {
  if (!checkBody(req.body, ["username", "email", "password"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }

  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    roles: ["contributor"],
  });

  try {
    const response = await newUser.save();
    if (response) {
  
      res.json({ result: true, datas: response });
    }
  } catch (error) {

    res.json({ result: false, error: error });
  }
});

/**
 * Update user
 */
router.put("/:id", async function (req, res, next) {
  const updateUser = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };

  const response = await User.updateOne({ _id: req.params.id }, updateUser);
  if (response.modifiedCount == 1) {
    res.json({ result: true, message: `${req.params.id}` });
  } else {
    res.json({ result: false, message: "Aucune modification" });
  }
});

/**
 * Remove user
 */
router.delete("/:id", async function (req, res, next) {
  const response = await User.deleteOne({ _id: req.params.id });
  if (response.ok) {
    res.json({ result: true, message: "User supprimé" });
  } else {
    res.json({ result: false, message: "User non supprimé" });
  }
});

module.exports = router;
