import express from 'express';
import cors from 'cors';
import { errorHandler } from './middleware/error.middleware';

const app = express()
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json());

app.use(errorHandler)


app.get('/api/health', (req,res) => { 
    res.json({
        success: true,
        message: "Server is running"

    })
 })

 app.listen(port, () => { 
    console.log(`Server is running on port ${port}`)
  })