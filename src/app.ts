import express,{Request,Response} from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import routes from './routes';
import authRoutes from './routes/auth.routes'
import docsRoutes from './routes/docs.routes';
// Load env variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middlewares
app.use(express.json()); // Parse JSON request bodies
app.get('/',(req:Request,res:Response)=>{
    res.send({message:"hello world"})
})
// // Routes
app.use('/api', routes);
// app.use('/api/docs', docsRoutes);
// app.use('/api/auth', authRoutes);
console.log('hello')
app.use((req, res) => {
    res.status(404).json({
      success: false,
      message: 'Resourcesss not found',
      error: {
        statusCode: 404,
        message: `Route ${req.method} ${req.originalUrl} not found`,
      },
    });
  });
  

export default app;
