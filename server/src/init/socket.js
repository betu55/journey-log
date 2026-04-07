const { Server } = require("socket.io");
const service = require("../services/service");
const jwt = require("jsonwebtoken"); 

const initSocket = (server) => {
  const io = new Server(server, {
    cors: { origin: "http://localhost:3000" }
  });


  io.use((socket, next) => {

    const token = socket.handshake.auth.token;

    if (!token) {
      return next(new Error("Authentication error: No token provided"));
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.user = decoded; 
      next();
    } catch (err) {
      next(new Error("Authentication error: Invalid token"));
    }
  });

  io.on("connection", (socket) => {

    console.log(`User connected: ${socket.user.username}`);

    socket.on("join_place", (placeId) => {
      socket.join(placeId);
    });

    socket.on("send_msg", async (data) => {
      const { placeId, text } = data;

      const username = socket.user.username;

      try {
        await service.addComment(placeId, { username, text });
      } catch (err) {
        console.error("Save Comment Error:", err);
      }

      io.to(placeId).emit("receive_msg", {
        username,
        text,
        time: new Date().toLocaleTimeString()
      });
    });
  });
};

module.exports = { initSocket };