const User = require("../models/User");
const CryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    // Find user by username
    const user = await User.findOne({ username: req.body.username });

    // If user does not exist, return an error
    if (!user) {
      return res.status(401).json("Wrong Credentials");
    }

    // Decrypt the stored password and compare with the provided password
    const hashedPassword = CryptoJs.AES.decrypt(
      user.password,
      process.env.PASS_SECRET_KEY
    );
    const originalPassword = hashedPassword.toString(CryptoJs.enc.Utf8);

    if (originalPassword !== req.body.password) {
      return res.status(401).json("Wrong Credentials");
    }

    // Generate a JWT token for successful login
    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_KEY,
      { expiresIn: "3d" } // Token expiration time
    );

    // Exclude the password from the response, and send the user data along with the access token
    const { password, ...others } = user._doc;

    res.status(200).json({ ...others, accessToken });
  } catch (error) {
    // Handle any errors that may occur during the login process
    res.status(500).json(error);
  }
};

module.exports = { login };
