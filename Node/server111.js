const http = require("http");

const express = require("express");
const { Server } = require("socket.io");

const app = express(); 
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});







let users = []

const chatNamespace = io.of("/chat");

chatNamespace.on("connection", (socket) => {
    let iid = socket.id

    socket.on("online", (data) => {
        console.log(`${data.nickname} Connected.`);
        socket.join(data.roomNumber);

        users.push({ id: socket.id, nickname: data.nickname, roomNumber: data.roomNumber });
        chatNamespace.emit("online", iid, users);
    });



    socket.on("disconnect", () => {
        console.log(`User disconnected.`);
        users.filter((user) => user.id !== socket.id)
    });



    socket.on("chat message", (data) => {
        console.log(data.name)
        chatNamespace.to(data.roomNumber).emit("chat message", data, users, iid);
    });



    socket.on("typing", (data) => {
        console.log(data.name)
        socket.broadcast.in(data.roomNumber).emit("typing", data);
    });



    socket.on("pvChat", (data) => {
        console.log(data.to);
        chatNamespace.to(data.to).emit("pvChat", data);
    });
});
