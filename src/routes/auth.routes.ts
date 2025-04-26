import express from 'express';
import { login, signup, sendOtpController,verifyOtp, getCurrentUser} from '../controllers/auth.controller';
import authenticateToken from '../middleware/auth';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/send-otp', sendOtpController);
router.post('/verify-otp', verifyOtp);
router.get('/me',authenticateToken, getCurrentUser);

export default router;
