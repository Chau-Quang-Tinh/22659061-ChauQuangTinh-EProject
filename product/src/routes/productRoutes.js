const express = require("express");
const ProductController = require("../controllers/productController");
const isAuthenticated = require("../utils/isAuthenticated");

const router = express.Router();
const productController = new ProductController();

// ✅ Tạo sản phẩm
router.post("/", isAuthenticated, productController.createProduct);

// ✅ Đặt hàng
router.post("/buy", isAuthenticated, productController.createOrder);

// ✅ Lấy danh sách sản phẩm
router.get("/", isAuthenticated, productController.getProducts);

// ✅ Lấy sản phẩm theo id (yêu cầu sát hạch)
router.get("/:id", isAuthenticated, productController.getProductById);

module.exports = router;
