import { Request, Response, NextFunction } from 'express';
import Chat from '../models/Chat';
import Pet from '../models/Pet';
import Message from '../models/Message';
import User from '../models/User';
import { AuthRequest } from '../middleware/auth'; // assume you're using req.user

export const getAllChats = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.id;
        console.log(req.user)
        if (!userId) {
            res.status(401).json({ success: false, message: 'Unauthorized' });
            return
        }

        const chats = await Chat.find({ participants: userId })
            .sort({ updatedAt: -1 }) // recent chats first
            .populate({
                path: 'participants',
                select: '_id name avatar',
                match: { _id: { $ne: userId } }, // get only the other user
            })
            .populate({
                path: 'pet',
                select: '_id name images type',
            })
            .populate({
                path: 'lastMessage',
                select: '_id sender text createdAt',
            });

        res.status(200).json({
            success: true,
            chats,
        });
    } catch (err) {
        next(err);
    }
};


export const getChatById = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.id;
        const chatId = req.params.id;

        console.log('chatId', chatId)

        if (!userId) {
            res.status(401).json({ success: false, message: 'Unauthorized' });
            return
        }

        // Find the chat and ensure user is a participant
        const chat = await Chat.findOne({ _id: chatId, participants: userId })
            .populate({
                path: 'participants',
                select: '_id name avatar',
            })
            .populate({
                path: 'pet',
                select: '_id name images type owner',
                populate: {
                    path: 'owner',
                    model: 'User', // or just 'populate: "owner"' if `ref` is defined correctly in schema
                    select: '_id name avatar role',
                },
            });

        if (!chat) {
            res.status(404).json({ success: false, message: 'Chat not found or access denied' });
            return
        }

        // Get all messages in that chat
        const messages = await Message.find({ chat: chatId })
            .sort({ createdAt: 1 }) // oldest first
            .populate({
                path: 'sender',
                select: '_id name avatar',
            });

        res.status(200).json({
            success: true,
            chat,
            messages,
        });
    } catch (err) {
        next(err);
    }
};
