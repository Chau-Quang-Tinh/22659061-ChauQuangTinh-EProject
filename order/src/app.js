const express = require("express");
const mongoose = require("mongoose");
const config = require("./config");
const messageBroker = require("./utils/messageBroker");
const orderRoutes = require("./routes/orderRoutes"); // 👈 import route

class App {
  constructor() {
    this.app = express();
    this.connectDB();
    this.setMiddlewares();
    this.setRoutes();
    this.connectBroker();
  }

  async connectDB() {
    await mongoose.connect(config.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  }

  async connectBroker() {
    await messageBroker.connect(config.rabbitMQ);
  }

  setMiddlewares() {
    this.app.use(express.json());
  }

  setRoutes() {
    this.app.use("/", orderRoutes); // 👈 gắn route
  }

  start() {
    this.server = this.app.listen(3002, () =>
      console.log("Server started on port 3002")
    );
  }
}

module.exports = App;
