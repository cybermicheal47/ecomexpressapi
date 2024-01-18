// routes/productRoutes.js
const express = require("express");
const router = express.Router();
const { verifyTokenAndAdmin } = require("../middleware/verifyWebToken");
const productController = require("../controllers/productController");

// CREATE Product
router.post("/", verifyTokenAndAdmin, productController.createProduct);

// UPDATE Product
router.put("/:id", verifyTokenAndAdmin, productController.updateProduct);

// DELETE Product
router.delete("/:id", verifyTokenAndAdmin, productController.deleteProduct);

// GET Product by ID
router.get("/find/:id", productController.getProductById);

// GET ALL Products
router.get("/", productController.getAllProducts);

module.exports = router;
