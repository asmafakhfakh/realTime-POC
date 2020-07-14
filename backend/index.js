const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);
const port = 3000;


let messages =[]


io.on("connection", socket => {
    socket.on("chat message", msg => {
      io.emit("chat message", msg);
      messages = [...messages, msg]
      console.log('msgs backend ',messages )
      
    });
  });

  server.listen(port, () => console.log("server running on port:" + port));

