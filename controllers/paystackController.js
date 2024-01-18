const router = require("express").Router();
const https = require("https");
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const pay = function (req, res) {
  const { email, amount } = req.query;

  if (!email || !amount) {
    return res
      .status(400)
      .json({ error: "Email and amount are required as query parameters" });
  }

  // Convert amount to kobo
  const amountInKobo = parseFloat(amount) * 100;

  const params = JSON.stringify({
    email,
    amount: amountInKobo, // Use the converted amount
  });

  const options = {
    hostname: "api.paystack.co",
    port: 443,
    path: "/transaction/initialize",
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
  };

  const reqpaystack = https
    .request(options, (respaystack) => {
      let data = "";

      respaystack.on("data", (chunk) => {
        data += chunk;
      });

      respaystack.on("end", () => {
        const responseData = JSON.parse(data);

        if (respaystack.statusCode === 200 && responseData.status) {
          res.status(200).json(responseData);
        } else {
          res.status(500).json({ error: "Failed to initiate payment" });
        }
      });
    })
    .on("error", (error) => {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    });

  reqpaystack.write(params);
  reqpaystack.end();
};

module.exports = { pay };
