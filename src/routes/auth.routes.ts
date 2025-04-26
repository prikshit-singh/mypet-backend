import express from 'express';
import { login, signup, sendOtpController,verifyOtp } from '../controllers/auth.controller';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/send-otp', sendOtpController);
router.post('/verify-otp', verifyOtp);

export default router;
