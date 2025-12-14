import express from 'express';
import 'dotenv/config'
import connectBD from './config/config.db.js';
import authRouter from './routes/auth.router.js';
import messageRouter from './routes/message.router.js'
import cookieParser from 'cookie-parser';
import passport from './config/passport.js';
import session from "express-session";

const app = express();
await connectBD();

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth",authRouter);
app.use('/api/message',messageRouter);

app.get('/',(req,res)=>{
    res.send("Api is working...");
})

app.listen(PORT, ()=>{
    console.log('server is running on http://localhost:3000');
})