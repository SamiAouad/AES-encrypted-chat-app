const express = require('express')
const app = express()
const http = require("http")
const cors = require("cors")
const {Server} = require('socket.io')

const server = http.createServer(app);

server.listen(5000, () => {
    console.log("server is running")
})
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke
}

app.use(cors(corsOptions))
app.use(express.urlencoded(
    {
        extended: true
    }
))

const user = require('./user/user.js')
app.use('/user', user)


const io = new Server(server, {
    cors: {
        origin: "*"
    },
});


io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("join_room", (data) => {
        console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });

    socket.on("send_message", (data) => {
        console.log(data)
        socket.to(data.room).emit("receive_message", data);
    });

    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    });
});
