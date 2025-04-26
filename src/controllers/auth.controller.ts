import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';
import validateRequiredFields from '../utils/validateRequiredFields';
import { sendEmail } from '../utils/sendEmail';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';
const JWT_EXPIRES_IN = '7d'; // Token validity

// Generate token
const generateToken = (userId: string) =>
    jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

// ✅ Signup
export const signup = async (req: Request, res: Response, next: NextFunction) => {
    try {


        const requiredFields = ['name', 'email', 'password', 'role'];
        const { success, missingFields } = validateRequiredFields(requiredFields, req.body);

        if (!success) {
            res.status(400).json({
                status: 400,
                success: false,
                message: `Missing required fields: ${missingFields?.join(', ')}`,
            });
            return
        }

        const { name, email, password, role } = req.body;

        const existing = await User.findOne({ email });
        if (existing) {

            res.status(400).json({ status: 400, success: false, error: 'Email already in use' })
            return
        };

        const otp = generateOTP()
        const htmlContent = generateHtml(otp)
        const user: IUser = await User.create({ name, email, password, role,otp });

        const result = await sendEmail({ email, name, subject: "Email verification" as string, htmlContent });
        res.status(201).json({ status: 201, success: true, result, message: 'Otp send to your email.' });
    } catch (err) {
        next(err)
    }
};

// ✅ Login
export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const requiredFields = ['email', 'password'];
        const { success, missingFields } = validateRequiredFields(requiredFields, req.body);

        if (!success) {
            res.status(400).json({
                status: 400,
                success: false,
                message: `Missing required fields: ${missingFields?.join(', ')}`,
            });
            return
        }

        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {

            res.status(400).json({ status: 400, success: false, error: 'Invalid credentials' });
            return
        };

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {

            res.status(400).json({ status: 400, success: false, error: 'Invalid credentials' });
            return
        };

        if(!user.isVerified){
            res.status(400).json({ status: 400, success: false, error: 'Email not verified' });
            return 
        }

        const token = generateToken(user._id.toString());
        res.status(200).json({ status: 200, success: true, token, user });
    } catch (err) {
        next(err)
    }
};



export const verifyOtp = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const requiredFields = ['email', 'otp'];
        const { success, missingFields } = validateRequiredFields(requiredFields, req.body);

        if (!success) {
            res.status(400).json({
                status: 400,
                success: false,
                message: `Missing required fields: ${missingFields?.join(', ')}`,
            });
            return
        }

        const { email, otp } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ status: 400, success: false, error: 'Invalid email' });
            return
        };
        if(otp !== user.otp){
            res.status(400).json({ status: 400, success: false, error: 'Invalid otp' });
            return 
        }
        const userUpdate = await User.findOneAndUpdate({ email },{isVerified:true,otp:null});
        res.status(200).json({ status: 200, success: true,message:"Otp verified successfully" });
    } catch (err) {
        next(err)
    }
};


export const sendOtpController = async (req: Request, res: Response) => {
   

    try {

        const requiredFields = ['email'];
        const { success, missingFields } = validateRequiredFields(requiredFields, req.body);
    
        if (!success) {
            res.status(400).json({
                status: 400,
                success: false,
                message: `Missing required fields: ${missingFields?.join(', ')}`,
            });
            return
        }
    
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ status: 400, success: false, error: 'Invalid email' });
            return
        };

        const otp = generateOTP()
        const htmlContent = generateHtml(otp)

        const result = await sendEmail({ email, name:user.name, subject: "Email verification" as string, htmlContent });
        res.status(200).json({ message: 'Email sent', data: result });
    } catch (error: any) {
        res.status(500).json({ error: error.message || 'Failed to send email' });
    }
};


const generateHtml = (otp:number) => {
return `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="UTF-8" />
              <title>Your OTP Code</title>
            </head>
            <body style="font-family: Arial, sans-serif; background-color: #f7f9fc; padding: 20px;">
              <div style="max-width: 480px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; padding: 30px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);">
                <h2 style="color: #2c3e50;">Verify Your Email</h2>
                <p style="font-size: 16px;">Use the following OTP to complete your verification:</p>
                <div style="font-size: 32px; letter-spacing: 10px; font-weight: bold; margin: 20px 0; color: #007BFF;">
                  ${otp}
                </div>
                <p style="font-size: 14px; color: #555;">This code will expire in 10 minutes. If you did not request this, please ignore this email.</p>
                <p style="font-size: 14px; color: #999; margin-top: 30px;">— Your App Team</p>
              </div>
            </body>
          </html>
        `
}

export const generateOTP = (): number => {
    return Math.floor(100000 + Math.random() * 900000);
  };
  

export const getCurrentUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // req.user should be set by your auth middleware

console.log((req as any).user)

      const userId = (req as any).user?.id;
  
      if (!userId) {
         res.status(401).json({
          status: 401,
          success: false,
          message: 'Unauthorized: No user ID found',
        });
        return
      }
  
      const user = await User.findById(userId).select('-password'); // Don't send password
  
      if (!user) {
         res.status(404).json({
          status: 404,
          success: false,
          message: 'User not found',
        });
        return
      }
  
      res.status(200).json({
        status: 200,
        success: true,
        user,
      });
    } catch (err) {
      next(err);
    }
  };

