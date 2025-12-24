import express from "express";
import "dotenv/config";
import connectBD from "./config/config.db.js";
import authRouter from "./routes/auth.router.js";
import messageRouter from "./routes/message.router.js";
import cookieParser from "cookie-parser";
import cors from 'cors';
import { app, server } from "./config/socket.js";

await connectBD();

const PORT = 3000;

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials:true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders:["Content-Type","Authorization"]
  })
);

app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);

server.listen(PORT, () => {
  console.log("server is running on http://localhost:3000");
});
