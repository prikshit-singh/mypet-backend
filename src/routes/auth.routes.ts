import express from 'express';
import { login, signup, sendOtpController,verifyOtp, getCurrentUser,updateCurrentUser,updatePassword , updateProfilePicture,sendForgetPasswordUrl,resetPasswordwithToken,verifyEmailToken} from '../controllers/auth.controller';
import authenticateToken from '../middleware/auth';
import { uploadProfileImage } from '../utils/uploadUserProfile';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/send-otp', sendOtpController);
router.post('/verify-otp', verifyOtp);
router.get('/me',authenticateToken, getCurrentUser);
router.put('/update-me',authenticateToken, updateCurrentUser);
router.put('/update-password',authenticateToken, updatePassword);
router.put('/update-avatar',authenticateToken,uploadProfileImage, updateProfilePicture);
router.post('/send-forget-password-request', sendForgetPasswordUrl);
router.post('/reset-password',authenticateToken, resetPasswordwithToken);
router.put('/verify-account',authenticateToken, verifyEmailToken);

export default router;
