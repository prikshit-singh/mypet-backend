import express from 'express';
import { getAllChats,getChatById } from '../controllers/ChatController';
import authenticateToken from '../middleware/auth';
const router = express.Router();

router.get('/get-all-chats',authenticateToken, getAllChats);
router.get('/:id',authenticateToken, getChatById);

export default router;
