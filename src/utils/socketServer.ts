import { Server as IOServer, Socket } from 'socket.io';
import Chat from '../models/Chat';
import Message, { IMessage } from '../models/Message';
import Pet from '../models/Pet';
import { Types } from 'mongoose';
export const setupSocket = (io: IOServer) => {
  io.on('connection', (socket: Socket) => {
    console.log('Connected:', socket.id);

    socket.on('join', (userId: string) => {
      socket.join(userId); // User joins their personal room
    });

    socket.on('send_message', async ({ senderId, receiverId, petId, text }) => {
      // Determine buyer and seller
      const pet = await Pet.findById(petId);
      if (!pet) return;

      const sellerId = pet.owner.toString();
      const buyerId = senderId === sellerId ? receiverId : senderId;

      // Ensure fixed order: pet + buyer + seller
      let chat = await Chat.findOne({
        pet: petId,
        participants: { $all: [senderId, receiverId] },
      });

      if (!chat) {
        chat = await Chat.create({
          pet: petId,
          participants: [senderId, receiverId],
        });
      }
      const message: IMessage = await Message.create({
        chat: chat._id,
        sender: senderId,
        text,
      });

      chat.lastMessage = message._id as Types.ObjectId;
      await chat.save();

      // Notify both participants
      io.to(senderId).emit('receive_message', { chatId: chat._id, message });
      io.to(receiverId).emit('receive_message', { chatId: chat._id, message });
    });

    socket.on('disconnect', () => {
      console.log('Disconnected:', socket.id);
    });
  });
};
