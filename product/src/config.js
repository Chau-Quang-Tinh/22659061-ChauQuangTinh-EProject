require("dotenv").config();

module.exports = {
  port: process.env.PORT || 3001,
  mongoURI:
    process.env.MONGODB_PRODUCT_URI || "mongodb://mongo:27017/productdb",
  jwtSecret: process.env.JWT_SECRET || "secret123",
  rabbitMQURI: process.env.RABBITMQ_URI || "amqp://localhost",
  exchangeName: "products",
  queueName: "products_queue",
  orderServiceUrl: process.env.ORDER_SERVICE_URL || "http://order:3002",
};
