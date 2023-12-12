const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const cors = require("cors");
require("dotenv").config();
const db = require("./config/db");
const { addMessageToDatabase } = require("./controllers/messageController");

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

// Handle socket connections
io.on("connection", (socket) => {
  // socket.on("get-all-messages", async ({ senderId, receiverId }) => {
  //   try {
  //     const messages = await getMessagesFromDatabase(senderId, receiverId);
  //     io.to(`message:${senderId}`).emit("all-messages", messages);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // });

  // Handle incoming messages
  socket.on("send-msg", async (data) => {
    // Broadcast the message to the receiver's socket
    io.to(`message:${data.receiverId}`).emit("receive-msg", {
      fromSelf: true,
      message: data.message,
    });
    io.to(`message:${data.senderId}`).emit("receive-msg", {
      fromSelf: false,
      message: data.message,
    });
    // Save the message to the database
    await addMessageToDatabase(data.senderId, data.receiverId, data.message);
  });

  // Join a room for each user
  socket.on("join-room", (userId) => {
    socket.join(`message:${userId}`);
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log(`WebSocket server is running on port ${PORT}`);
});
