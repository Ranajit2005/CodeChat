import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import dbConnection from './config/dbConnection.js';
import authRouter from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.route.js';
import messageRouter from './routes/message.route.js';
import { app, server } from './socket/socket.js';


dotenv.config();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("static", express.static("public"));

app.use("/api/auth",authRouter);
app.use("/api/user",userRouter);
app.use("/api/message", messageRouter);

server.listen(port, () => {
  dbConnection();
  console.log(`Server is running on http://localhost:${port}`);
});