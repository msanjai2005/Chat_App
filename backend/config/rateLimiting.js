import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
    windowMs:1*60*1000,
    max:20,
    message:"Too many requests from this IP. place try again later."
})

export default limiter;