const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/orderController");

const orderController = new OrderController();

// Tạo đơn hàng mới
router.post("/orders", (req, res) => orderController.createOrder(req, res));

// Lấy thông tin đơn hàng theo ID
router.get("/orders/:id", (req, res) => orderController.getOrderById(req, res));

module.exports = router;
