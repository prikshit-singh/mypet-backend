import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import routes from './routes';
import authRoutes from './routes/auth.routes'

// Load env variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middlewares
app.use(express.json()); // Parse JSON request bodies

// Routes
app.use('/api', routes);
app.use('/api/auth', authRoutes);

export default app;
