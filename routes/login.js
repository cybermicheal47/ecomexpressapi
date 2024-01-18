const router = require("express").Router();
const User = require("../models/User");
const CryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");
const loginController = require("../controllers/loginController");
// Login
router.post("/login", loginController.login);

module.exports = router;
