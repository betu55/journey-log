const { io } = require("socket.io-client");


const MY_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ZDRmZGRkNDJjZWY3MWRlMTZhMjUwMyIsInVzZXJuYW1lIjoidGVzdCIsImlhdCI6MTc3NTU2OTk4MywiZXhwIjoxNzc1NjU2MzgzfQ.i7Kf397azCzIVvNYfOkVXjz7HnSHw4dP3o_fsBSOpCM"; 
const PLACE_ID = "69d4fddd42cef71de16a2507"; 
const socket = io("http://localhost:8080", {
  auth: { token: MY_TOKEN }
});

socket.on("connect", () => {
  console.log("Server connected. ID:", socket.id);


  socket.emit("join_place", PLACE_ID);
});


socket.on("receive_msg", (data) => {
  console.log("New message:", data);
});


setTimeout(() => {
  console.log("Sending test message...");
  socket.emit("send_msg", {
    placeId: PLACE_ID,
    text: "Hello from test script super new version"
  });
}, 2000);

socket.on("connect_error", (err) => {
  console.error("Error connecting to server:", err.message);
});