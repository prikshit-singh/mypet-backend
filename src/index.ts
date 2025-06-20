import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/errorHandler';
import connectDB from './config/db';
import routes from './routes';
import authRoutes from './routes/auth.routes'
import docsRoutes from './routes/docs.routes';
import userAddressRoute from './routes/userAddress.routes';
import petRouter from './routes/pet.routes';
import petRequestRouter from './routes/petRequest.routes';
import path from 'path';
import cors from 'cors';
import http from 'http';
import { setupSocket } from './utils/socketServer';

// Load env variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

const server = http.createServer(app);

// Setup WebSocket
setupSocket(server);


// Middlewares
app.use(express.json()); // Parse JSON request bodies
app.use(cors())
app.use('/api/petimages', express.static(path.join(__dirname, '../petimages')));
app.use('/api/profiles', express.static(path.join(__dirname, '../profiles')));
app.get('/api', (req: Request, res: Response) => {
  res.send({ message: "hello world" })
})
// // Routes
app.use('/api', routes);
app.use('/api/docs', docsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/address', userAddressRoute);
app.use('/api/pet', petRouter);
app.use('/api/request', petRequestRouter);


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
  console.log(`🚀 Server running at ${process.env.BASE_URL}:${PORT}`);
});
