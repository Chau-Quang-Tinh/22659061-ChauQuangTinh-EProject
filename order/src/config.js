require("dotenv").config();

module.exports = {
  mongoURI: process.env.MONGODB_ORDER_URI || "mongodb://mongo:27017/orderdb",
  jwtSecret: process.env.JWT_SECRET || "secret123",
  rabbitMQ: process.env.RABBITMQ_URL || "amqp://rabbitmq:5672",
  rabbitMQQueue: "orders",
  port: 3002,
};
