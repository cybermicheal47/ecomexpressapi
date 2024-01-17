const {
  verifyWebToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyWebToken");

const order = require("../models/Order");
const router = require("express").Router();

//CREATE Order

router.post("/", verifyWebToken, async (req, res) => {
  const newOrder = new order(req.body);

  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (error) {
    res.status(500).json(error);
  }
});

// update Order

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

//DELETE Orders

router.delete =
  ("/:id",
  verifyTokenAndAdmin,
  async (req, res) => {
    try {
      await order.findByIdAndDelete(req.params.id);
      res.status(200).json(" Order  Deleted");
    } catch (error) {
      res.status(500).json(error);
    }
  });

// GET  User Orders
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const Order = await order.find({ userId: req.params.userId });
    if (!Order) {
      return res.status(404).json({ message: " Order not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET ALL Orders
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const Order = await order.find();
    res.status(200).json(Order);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get Orders within the Last Two Months
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
  const currentDate = new Date();
  const firstDayOfCurrentMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );

  const lastMonth = new Date(firstDayOfCurrentMonth);
  lastMonth.setMonth(firstDayOfCurrentMonth.getMonth() - 1);

  console.log("Current Month Range:", {
    start: firstDayOfCurrentMonth.toISOString(),
    end: currentDate.toISOString(),
  });

  console.log("Previous Month Range:", {
    start: lastMonth.toISOString(),
    end: firstDayOfCurrentMonth.toISOString(),
  });

  try {
    const stats = await order.aggregate([
      { $match: { createdAt: { $gte: lastMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
