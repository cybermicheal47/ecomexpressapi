const {
  verifyWebToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyWebToken");

const order = require("../models/Order");
const router = require("express").Router();

//CREATE Product

router.post("/", verifyWebToken, async (req, res) => {
  const newOrder = new order(req.body);

  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (error) {
    res.status(500).json(error);
  }
});

// update Cart

router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedOrder = await order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE Cart

router.delete =
  ("/:id",
  verifyTokenAndAuthorization,
  async (req, res) => {
    try {
      await Cart.findByIdAndDelete(req.params.id);
      res.status(200).json(" Cart  Deleted");
    } catch (error) {
      res.status(500).json(error);
    }
  });

// GET  User Carts
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) {
      return res.status(404).json({ message: "  Cart not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET ALL Carts
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
