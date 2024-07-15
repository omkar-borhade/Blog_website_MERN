import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
mongoose
.connect(process.env.MONGO)
.then(()=>
{console.log("database connected!!")})
.catch((err)=>{
    console.log(err);
});

const app = express()
const port = 3000

// app.use(cors({
//     credentials:true,
//     origin:'http://localhost:5173'
// }))
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(` app listening on port ${port}!`))