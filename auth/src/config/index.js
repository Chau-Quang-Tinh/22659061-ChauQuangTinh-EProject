require("dotenv").config();

module.exports = {
  // Kết nối tới MongoDB service 'mongo' trong Docker
  mongoURI: process.env.MONGODB_AUTH_URI || "mongodb://mongo:27017/authdb",

  // Khóa bí mật JWT dùng chung giữa tất cả service
  jwtSecret: process.env.JWT_SECRET || "secret123",
};
