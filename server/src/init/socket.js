const { Server } = require("socket.io");
const service = require("../services/service");
const jwt = require("jsonwebtoken"); 

const COMMENT_MAX_LENGTH = 1000;

const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
    origin: ["http://localhost:5173", "http://localhost:3000"],
    methods: ["GET", "POST"]
    }
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

  io.on("connection", async(socket) => {
    try {
      const placeIds = await service.getRelevantPlaces(socket.user);
      placeIds.forEach((id) => {
        socket.join(id.toString());
      });
    } catch (err) {
      console.error("Auto-join error:", err);
      return
    }

    console.log(`User connected: ${socket.user.username}`);

    socket.on("join_place", (placeId) => {
      socket.join(placeId);
    });

    socket.on("send_msg", async (data) => {
      const { placeId, text } = data;
      const normalizedText = text?.trim();

      const username = socket.user.username;
      const timestamp = new Date().toISOString();

      if (!normalizedText || normalizedText.length > COMMENT_MAX_LENGTH) {
        return;
      }

      try {
        
        socket.join(placeId);
        const placeData = await service.addComment(placeId, { username, text: normalizedText, time: timestamp });

        io.to(placeId).emit("receive_msg", {
        username,
        placeId: placeId,
        placeName : placeData.placeName,
        text: normalizedText,
        time: timestamp
      });

      } catch (err) {
        console.error("Save Comment Error:", err);
        return;
      }
      
    });
  });
};

module.exports = { initSocket };
