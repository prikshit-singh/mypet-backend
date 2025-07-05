import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/errorHandler';
import connectDB from './config/db';
import routes from './routes';
import authRoutes from './routes/auth.routes'
import docsRoutes from './routes/docs.routes';
import chatRoutes from './routes/chat.routes'
import userAddressRoute from './routes/userAddress.routes';
import petRouter from './routes/pet.routes';
import petRequestRouter from './routes/petRequest.routes';
import path from 'path';
import cors from 'cors';
import http from 'http';
import { setupSocket } from './utils/socketServer';
import User from './models/User';
import { Server as HttpServer } from 'http';
import { Server as IOServer } from 'socket.io';
// Load env variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

const server = new HttpServer(app); // HTTP server

// ✅ Create Socket.IO server with CORS
const io = new IOServer(server, {
  cors: {
    origin: '*', // Or specify allowed origins
    methods: ['GET', 'POST','PUT','PATCH'],
  },
});

// ✅ Setup WebSocket
setupSocket(io);

app.use((req, res, next) => {
  const contentLength = req.headers['content-length'];
  console.log(`[${req.method}] ${req.originalUrl} - Content-Length: ${contentLength} bytes`);
  next();
});
// Middlewares
app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
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
app.use('/api/chat', chatRoutes);


console.log('hello')

// const changePassword = async () => {
//   const user = await User.findOne({ email: 'prikshitsingh463@gmail.com' });

//   if (!user) {
//     console.log('User not found');
//     return;
//   }

//   user.password = 'Test@1234'; // this triggers the pre-save hook
//   await user.save(); // password gets hashed here

//   console.log('Password updated and hashed:', user.password);
// };
// changePassword()

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



server.listen(PORT, () => {
  console.log(`🚀 Server running at ${process.env.BASE_URL}`);
});
