const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const cors = require("cors");
const db = require("./config/db");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./Routes/userRoutes"));
app.use("/api/msg", require("./Routes/messageRoutes"));

// socket io server
const server = http.createServer(app);

// Socket.IO server
const io = socketIO(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

let onlineUsers = {};

// socket connection event handler
io.on("connection", (socket) => {
  console.log(socket);
  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
  });
  // socket.on("add-user", (userId) => {
  //   onlineUsers[userId] = socket.id;
  // });

  // socket.on("send-msg", (data) => {
  //   console.log(data);
  //   const sendUserSocket = onlineUsers[data.to];
  //   if (sendUserSocket) {
  //     socket.to(sendUserSocket).emit("msg-receive", data.msg);
  //   }
  // });
});

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log(`WebSocket server is running on port ${PORT}`);
});
