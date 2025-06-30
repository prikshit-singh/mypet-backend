import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';
import validateRequiredFields from '../utils/validateRequiredFields';
import { sendEmail } from '../utils/sendEmail';
import { forgotPasswordVerifyUrlContent, emailVerifyUrlContent } from '../utils/htmlContent';
export interface AuthRequest extends Request {
  user?: any; // You can type this more specifically if needed
}
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';
const JWT_EXPIRES_IN = '7d'; // Token validity
const FrontEnd_URL = process.env.FrontEnd_URL || 'www.gitgurus.com'
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
      res.status(400).json({ status: 400, success: false, message: 'Email already in use' })
      return
    };

    const user: IUser = await User.create({ name, email, password, role });

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
        tokenType: "verify-account",
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    const verificationUrl = `${FrontEnd_URL}/verify-account?token=${token}`;
    const htmlContent = emailVerifyUrlContent(verificationUrl);

    await sendEmail(
      {
        email: user.email,
        name: user.name,
        subject: "Verify account",
        htmlContent
      }

    );
    const result = await sendEmail(
      {
        email: user.email,
        name: user.name,
        subject: "Verify account",
        htmlContent
      }

    );
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

      res.status(400).json({ status: 400, success: false, message: 'User not found' });
      return
    };

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {

      res.status(400).json({ status: 400, success: false, message: 'Invalid credentials' });
      return
    };

    if (!user.isVerified) {

      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
          role: user.role,
          tokenType: "verify-account",
        },
        JWT_SECRET,
        { expiresIn: "1h" }
      );

      const verificationUrl = `${FrontEnd_URL}/verify-account?token=${token}`;
      const htmlContent = emailVerifyUrlContent(verificationUrl);

      await sendEmail(
        {
          email: user.email,
          name: user.name,
          subject: "Verify account",
          htmlContent
        }
      )
      res.status(400).json({ status: 400, success: false, message: 'Email not verified. We sent an verify account url to your email.' });
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
      res.status(400).json({ status: 400, success: false, message: 'Invalid email' });
      return
    };
    if (otp !== user.otp) {
      res.status(400).json({ status: 400, success: false, message: 'Invalid otp' });
      return
    }
    const userUpdate = await User.findOneAndUpdate({ email }, { isVerified: true, otp: null });
    res.status(200).json({ status: 200, success: true, message: "Otp verified successfully" });
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
      res.status(400).json({ status: 400, success: false, message: 'Invalid email' });
      return
    };

    const otp = generateOTP()
    const htmlContent = generateHtml(otp)

    const result = await sendEmail({ email, name: user.name, subject: "Email verification" as string, htmlContent });
    res.status(200).json({ message: 'Email sent', data: result });
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Failed to send email' });
  }
};

const generateHtml = (otp: number) => {
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

export const updateCurrentUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user?.id;

    if (!userId) {
      res.status(401).json({
        status: 401,
        success: false,
        message: 'Unauthorized: No user ID found',
      });
      return
    }

    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({
        status: 404,
        success: false,
        message: 'User not found',
      });
      return
    }

    // Update fields one by one if present in req.body
    if (req.body.name !== undefined) {
      user.name = req.body.name;
    }

    if (req.body.bio !== undefined) {
      user.bio = req.body.bio;
    }
    if (req.body.phone !== undefined) {
      user.phone = req.body.phone;
    }

    // Handle nested notification object
    if (req.body.notification !== undefined && typeof req.body.notification === 'object') {
      user.notification.email = req.body.notification.email ?? user.notification.email;
      user.notification.messages = req.body.notification.messages ?? user.notification.messages;
      user.notification.petRequests = req.body.notification.petRequests ?? user.notification.petRequests;
      user.notification.marketing = req.body.notification.marketing ?? user.notification.marketing;
    }

    await user.save();

    const updatedUser = await User.findById(userId).select('-password');

    res.status(200).json({
      status: 200,
      success: true,
      user: updatedUser,
    });

  } catch (err) {
    next(err);
  }
};


export const updatePassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user?.id;

    if (!userId) {
      res.status(401).json({
        status: 401,
        success: false,
        message: 'Unauthorized: No user ID found',
      });
      return
    }

    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (!currentPassword || !newPassword || !confirmPassword) {
      res.status(400).json({
        status: 400,
        success: false,
        message: 'Please provide currentPassword, newPassword and confirmPassword',
      });
      return
    }

    if (newPassword !== confirmPassword) {
      res.status(400).json({
        status: 400,
        success: false,
        message: 'New password and confirm password do not match',
      });
      return
    }

    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({
        status: 404,
        success: false,
        message: 'User not found',
      });
      return
    }

    const isMatch = await user.comparePassword(currentPassword);

    if (!isMatch) {
      res.status(401).json({
        status: 401,
        success: false,
        message: 'Current password is incorrect',
      });
      return
    }

    // Assign new password directly, Mongoose pre-save hook will hash it
    user.password = newPassword;
    await user.save();

    res.status(200).json({
      status: 200,
      success: true,
      message: 'Password updated successfully',
    });

  } catch (err) {
    next(err);
  }
};


export const sendForgetPasswordUrl = async (req: Request, res: Response) => {
  try {
    const required = ["email"];
    console.log('req.body', req.body)

    const { success, missingFields } = validateRequiredFields(required, req.body);

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
      throw new Error("User not exist.");
    }


    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
        tokenType: "reset-password",
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    const verificationUrl = `${FrontEnd_URL}/reset-password?token=${token}`;
    const htmlContent = forgotPasswordVerifyUrlContent(verificationUrl);

    await sendEmail(
      {
        email: user.email,
        name: user.name,
        subject: "Forgot password",
        htmlContent
      }

    );
    res.status(200).json({
      status: true,
      message:
        "Please verify your email address by clicking the link we just sent you.",
    });
  } catch (error) {
    console.error("resendVerifyUrl error:", error);
    res.status(500).json({ status: false, message: "Server error" });
  }
};

export const resetPasswordwithToken = async (req: AuthRequest, res: Response) => {
  try {
    const { id, email, role, tokenType } = req.user;

    if (tokenType !== "reset-password") {
      res.status(400).json({ status: false, message: "Invalid token type" });
      return;
    }

    const required = ["newPassword"];
    console.log('req.body', req.body)

    const { success, missingFields } = validateRequiredFields(required, req.body);

    if (!success) {
      res.status(400).json({
        status: 400,
        success: false,
        message: `Missing required fields: ${missingFields?.join(', ')}`,
      });
      return
    }


    const { newPassword } = req.body

    let user: any = await User.findOne({ _id: id, email });;

    if (!user) {
      res.status(404).json({ status: false, message: "User not found" });
      return;
    }

    const isMatch = await user.comparePassword(newPassword);
    if (isMatch) {
      res.status(400).json({ status: 400, success: false, message: 'Please choose a different password.' });
      return
    };
    user.password = newPassword
    await user.save();
    res
      .status(200)
      .json({ status: true, message: "Password updated successfully" });
  } catch (error) {
    console.error("verifyEmailToken error:", error);
    res
      .status(400)
      .json({ status: false, message: "Invalid or expired token" });
  }
};

export const updateProfilePicture = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user?.id;

    if (!userId) {
      res.status(401).json({
        status: 401,
        success: false,
        message: 'Unauthorized: No user ID found',
      });
      return
    }

    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({
        status: 404,
        success: false,
        message: 'User not found',
      });
      return
    }

    if (!req.file) {
      res.status(400).json({
        status: 400,
        success: false,
        message: 'No file uploaded',
      });
      return
    }

    // Set the avatar field to the file path or URL
    user.avatar = `${process.env.BASE_URL}/api/profiles/${req.file.filename}`;
    await user.save();

    res.status(200).json({
      status: 200,
      success: true,
      message: 'Profile picture updated successfully',
      avatar: user.avatar,
    });
  } catch (err) {
    next(err);
  }
};

export const verifyEmailToken = async (req: AuthRequest, res: Response) => {
	try {
		const { id, email, role, tokenType } = req.user;

		if (tokenType !== "verify-account") {
			res.status(400).json({ status: false, message: "Invalid token type" });
			return;
		}

		let user: any = await User.findOne({ _id: id, email });;

		
		if (!user) {
			res.status(404).json({ status: false, message: "User not found" });
			return;
		}

		if (user.isVerified) {
			res.status(200).json({ status: true, message: "Email already verified" });
			return;
		}

		user.isVerified = true;
		await user.save();
		
		res
			.status(200)
			.json({ status: true, message: "Email verified successfully." });
	} catch (error) {
		console.error("verifyEmailToken error:", error);
		res
			.status(400)
			.json({ status: false, message: "Invalid or expired token" });
	}
};


