import { Request, Response,NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';
import validateRequiredFields from '../utils/validateRequiredFields';

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
                status:400,
                success: false,
                message: `Missing required fields: ${missingFields?.join(', ')}`,
            });
            return
        }

        const { name, email, password, role } = req.body;

        const existing = await User.findOne({ email });
        if (existing) {
            
            res.status(400).json({status:400,success: false, error: 'Email already in use' })
            return
        };
        const user: IUser = await User.create({ name, email, password, role });
        const token = generateToken(user._id.toString());
        res.status(201).json({status:201,success: true, token, user });
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
                status:400,
                success: false,
                message: `Missing required fields: ${missingFields?.join(', ')}`,
            });
            return
        }

        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {

            res.status(400).json({status:400,success: false, error: 'Invalid credentials' });
            return
        };

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {

            res.status(400).json({status:400,success: false, error: 'Invalid credentials' });
            return
        };

        const token = generateToken(user._id.toString());
        res.status(200).json({status:200,success: true, token, user });
    } catch (err) {
        next(err)
    }
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
