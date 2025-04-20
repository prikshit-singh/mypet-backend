import express,{Request,Response} from 'express';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/errorHandler';
import connectDB from './config/db';
import routes from './routes';
import authRoutes from './routes/auth.routes'
import docsRoutes from './routes/docs.routes';
import cors from 'cors'
// Load env variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middlewares
app.use(express.json()); // Parse JSON request bodies
app.use(cors())
app.get('/',(req:Request,res:Response)=>{
    res.send({message:"hello world"})
})
// // Routes
app.use('/api', routes);
app.use('/api/docs', docsRoutes);
app.use('/api/auth', authRoutes);
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

  app.use(errorHandler);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
