const router = require("express").Router();
const https = require("https");
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
const paystackController = require("../controllers/paystackController");

router.get("/", paystackController.pay);

module.exports = router;
