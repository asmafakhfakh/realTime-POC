const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);
const port = 3010;

let messages = []

io.on("connection", socket => {

    console.log("user connected", socket.id);
    // //Get the chatID of the user and join in a room of the same chatID
    // chatID = socket.handshake.query.chatID
    // socket.join(chatID)
    // //Leave the room if the user closes the socket
    // socket.on('disconnect', () => {
    //     socket.leave(chatID)
    //     console.log("Disconnected")
    // })

    socket.on("chat message", msg => {

        // receiverChatID = msg.receiverChatID
        //   senderChatID = msg.senderChatID
        //   content = msg.content
        // //Send message to only that particular room
        // socket.in(receiverChatID).emit('receive_message', {
        //     'content': content,
        //     'senderChatID': senderChatID,
        //     'receiverChatID':receiverChatID,
        // })

        io.emit("chat message", msg);
        messages = [...messages, msg]
        console.log('msgs backend ', messages)

    });
});

server.listen(port, () => console.log("server running on port:" + port));