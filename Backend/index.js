import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';


dotenv.config();
mongoose
.connect(process.env.MONGO)
.then(()=>
{console.log("database connected!!")})
.catch((err)=>{
    console.log(err);
});

const app = express()
app.use(express.json());
const port = 3000

app.use(cors({
    credentials:true,
    origin:'http://localhost:5173'
}))
app.use('/api/user',userRoutes)
app.use('/api/auth',authRoutes)

app.use((err,req,res,next)=>{
    const statusCode =err.statusCode || 500
    const message=err.message ||'Internal Server Error'
    res.status(statusCode).json({
        success:false,
        statusCode,
        message
    });
});

app.listen(port, () => console.log(` app listening on port ${port}!`))