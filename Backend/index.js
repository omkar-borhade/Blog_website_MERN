import express from 'express';
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

// app.use(cors({
//     credentials:true,
//     origin:'http://localhost:5173'
// }))
app.use('/api/user',userRoutes)
app.use('/api/auth',authRoutes)

app.listen(port, () => console.log(` app listening on port ${port}!`))