import express from 'express';

const app = express()

const port = 3000
// app.use(cors({
//     credentials:true,
//     origin:'http://localhost:5173'
// }))
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(` app listening on port ${port}!`))