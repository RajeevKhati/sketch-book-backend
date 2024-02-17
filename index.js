const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  /* options */
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  // ...
  console.log("backend socket connected...");
  socket.on("beginPath", (args) => {
    socket.broadcast.emit("beginPath", args);
  });

  socket.on("draw", (args) => {
    socket.broadcast.emit("draw", args);
  });

  socket.on("changeConfig", (args) => {
    socket.broadcast.emit("changeConfig", args);
  });

  socket.on("menuItemClick", (args) => {
    socket.broadcast.emit("menuItemClick", args);
  });
});

httpServer.listen(5000);
