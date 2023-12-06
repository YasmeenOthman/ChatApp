const express = require("express");
const cors = require("cors");
const socket = require("socket.io");
const db = require("./config/db");

// Load environment variables
require("dotenv").config();

const app = express();
// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./Routes/userRoutes"));
app.use("/api/msg", require("./Routes/messageRoutes"));

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () => {
  console.log(`WebSocket server is running on port ${PORT}`);
});

// socket io server
const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

// global.onlineUsers = new Map();
io.on("connection", (socket) => {
  console.log("user is connected");
  // global.chatSocket = socket;
  // socket.on("add-user", (userId) => {
  //   onlineUsers.set(userId, socket.id);
  // });

  // socket.on("send-msg", (data) => {
  //   const sendUserSocket = onlineUsers.get(data.to);
  //   if (sendUserSocket) {
  //     socket.to(sendUserSocket).emit("msg-recieve", data.msg);
  //   }
  // });
});
