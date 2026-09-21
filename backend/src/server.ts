import express from 'express';
import cors from 'cors';
import "dotenv/config";
import { errorHandler } from './middleware/error.middleware';
import taskRoutes from './routes/task.routes';

const app = express()
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json());
app.use('/api/tasks', taskRoutes)



app.get('/api/health', (req,res) => { 
    res.json({
        success: true,
        message: "Server is running"
        
    })
})


app.use(errorHandler)

app.listen(port, () => { 
    console.log(`Server is running on port ${port}`)
  })