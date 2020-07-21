const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);
const mongoose = require("mongoose");
const config = require('./config');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const communityChat = require('./models/communityChat.model');
const user = require("./models/chatUser.model");

app.get('/oldmessages/community', cors(), (req, res) => {
    communityChat.find({})
        .exec((err, docs) => {
            err ? res.end() : res.send(docs)
        });
});
app.options('/signin', cors())
app.post('/signin', cors(), (req, res) => {
    user.findOne({
        username: req.body.username,
        password: req.body.password
    }).exec((err, doc) => {
        if (!doc) {
            res.status(401).send("Invalid credentials")
        } else {
            let token = jwt.sign({ userid: doc._id, username: doc.username }, config.SECRET_KEY);
            res.send(token)
        };
    });
});


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
        let chatMessage = new communityChat({ content: msg.content, sender: msg.sender, time: new Date() });
        chatMessage.save();
        io.emit("chat message", msg);
    });

});

//save chat to the database
mongoose.connect(config.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
})
    .then(db => {
        console.log("connected correctly to DB");
    });

server.listen(config.PORT,
    () => console.log("server running on port:" + config.PORT)
);