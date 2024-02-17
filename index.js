const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);

const isDev = app.settings.env === "development";
const FRONTEND_URL = isDev
  ? "http://localhost:3000"
  : "https://sketch-book-six.vercel.app";

const io = new Server(httpServer, {
  cors: {
    origin: FRONTEND_URL,
  },
});

io.on("connection", (socket) => {
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
