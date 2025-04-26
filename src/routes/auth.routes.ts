import express from 'express';
import { login, signup,getCurrentUser } from '../controllers/auth.controller';
import authenticateToken from '../middleware/auth';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/me',authenticateToken, getCurrentUser);

export default router;
