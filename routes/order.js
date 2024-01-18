// routes/orderRoutes.js
const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const {
  verifyWebToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middleware/verifyWebToken");

// CREATE Order
router.post("/", verifyWebToken, orderController.createOrder);

// UPDATE Order
router.put("/:id", verifyTokenAndAdmin, orderController.updateOrder);

// DELETE Order
router.delete("/:id", verifyTokenAndAdmin, orderController.deleteOrder);

// GET User Orders
router.get(
  "/find/:userId",
  verifyTokenAndAuthorization,
  orderController.getUserOrders
);

// GET ALL Orders
router.get("/", verifyTokenAndAdmin, orderController.getAllOrders);

// Get Orders within the Last Two Months
router.get("/stats", verifyTokenAndAdmin, orderController.getOrdersStats);

module.exports = router;
