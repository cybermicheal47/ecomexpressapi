const router = require("express").Router();
const User = require("../models/User");
const CryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");
const authController = require("../controllers/authController");
//REGISTER

router.post("/register", authController.register);
module.exports = router;
