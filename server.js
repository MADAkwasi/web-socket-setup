const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = 8000;

  io.on("connection", (socket) => {
    console.log(socket);
    console.log(`A user connected: ${socket.id}`);

    socket.on("locationUpdate", (data) => {
      console.log(`Received location update: ${data}`);

      io.emit("locationUpdate", data);
    });

    socket.on("disconnect", (socket) => {
      console.log(`A user disconnected: ${socket.id}`);
    });
  });

server.listen(PORT, () => {
  console.log(`Web socket server is running on port ${PORT}`);
});
