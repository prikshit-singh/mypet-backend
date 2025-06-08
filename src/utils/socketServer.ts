// src/socketServer.ts
import { Server as SocketIOServer } from 'socket.io';
import { Server as HTTPServer } from 'http';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const onlineUsers = new Map<string, string>();

export const setupSocket = (httpServer: HTTPServer) => {
  const io = new SocketIOServer(httpServer, {
    cors: {
      origin: '*',
    },
  });

  io.use(async (socket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) return next(new Error('Authentication error'));

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
      const user = await User.findById(payload.id);
      if (!user) throw new Error();
      (socket as any).user = user;
      next();
    } catch (err) {
      next(new Error('Authentication error'));
    }
  });

  io.on('connection', (socket) => {
    const user = (socket as any).user;
    console.log(`User connected: ${user.name} (${user._id})`);

    onlineUsers.set(user._id.toString(), socket.id);

    socket.on('privateMessage', ({ toUserId, message }) => {
      const toSocketId = onlineUsers.get(toUserId);
      if (toSocketId) {
        io.to(toSocketId).emit('privateMessage', {
          fromUserId: user._id,
          fromName: user.name,
          avatar: user.avatar,
          message,
          timestamp: new Date().toISOString(),
        });
      }
    });

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${user.name}`);
      onlineUsers.delete(user._id.toString());
    });
  });
};
