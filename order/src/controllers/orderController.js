const Order = require("../models/order");

class OrderController {
  async createOrder(req, res) {
    try {
      const { products, username, orderId } = req.body;

      const order = new Order({
        orderId,
        products,
        username,
        status: "completed",
      });

      await order.save();
      return res.status(201).json(order);
    } catch (error) {
      console.error("Error creating order:", error);
      return res.status(500).json({ message: "Failed to create order" });
    }
  }

  async getOrderById(req, res) {
    try {
      const { id } = req.params;
      const order = await Order.findOne({ orderId: id });
      if (!order) return res.status(404).json({ message: "Order not found" });
      return res.status(200).json(order);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error" });
    }
  }
}

module.exports = OrderController;
