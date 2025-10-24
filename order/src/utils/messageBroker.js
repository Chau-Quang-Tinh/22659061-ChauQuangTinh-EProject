const amqp = require("amqplib");
const orderService = require("../services/orderService");

let channel, connection;

async function connect(
  rabbitMQUrl = process.env.RABBITMQ_URL || "amqp://guest:guest@rabbitmq:5672"
) {
  try {
    console.log("Connecting to RabbitMQ at:", rabbitMQUrl);

    connection = await amqp.connect(rabbitMQUrl);
    channel = await connection.createChannel();
    await channel.assertQueue("orders");
    await channel.assertQueue("products"); // đảm bảo có cả hàng đợi phản hồi

    console.log("✅ Connected to RabbitMQ");
    consumeMessages();
  } catch (error) {
    console.error("❌ Failed to connect to RabbitMQ:", error.message);
    setTimeout(() => connect(rabbitMQUrl), 5000); // tự động retry sau 5s
  }
}

async function consumeMessages() {
  if (!channel) {
    console.error("RabbitMQ channel not initialized!");
    return;
  }

  channel.consume("orders", async (message) => {
    try {
      const orderData = JSON.parse(message.content.toString());
      console.log("📦 Received order:", orderData);

      await orderService.createOrder(orderData);

      // Gửi phản hồi lại hàng đợi "products" sau khi lưu thành công
      channel.sendToQueue(
        "products",
        Buffer.from(
          JSON.stringify({
            ...orderData,
            status: "completed",
          })
        )
      );

      channel.ack(message);
      console.log("✅ Order processed and acknowledged");
    } catch (err) {
      console.error("⚠️ Error processing message:", err.message);
    }
  });
}

module.exports = { connect };
