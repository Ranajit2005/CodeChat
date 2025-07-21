import express from "express"
import http from "http"
import { Server } from "socket.io"


const app = express()
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL || "http://localhost:5173",
    },
});

export const userWithSocket = {};

export const getReciverSocketId = (reciver) => {
    return userWithSocket[reciver];
}

io.on("connection",(socket) => {
    
    const userId = socket.handshake.query.userId;  

    if (userId != undefined) {
        userWithSocket[userId] = socket.id;
    }

    io.emit("getOnlineUsers", Object.keys(userWithSocket));

    socket.on("disconnect", () => {
        delete userWithSocket[userId];
        io.emit("getOnlineUsers", Object.keys(userWithSocket));
    });
})

export { app, server,io }