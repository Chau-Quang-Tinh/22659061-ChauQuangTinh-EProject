const Order = require("../models/order");

class OrderService {
  async createOrder(orderData) {
    try {
      const order = new Order(orderData);
      await order.save();
      console.log("Order saved to DB:", order);
      return order;
    } catch (error) {
      console.error("Error saving order:", error);
      throw error;
    }
  }
}

module.exports = new OrderService();
