import { Request, Response } from 'express';
import { sendEmail } from '../utils/sendEmail';
import User from '../models/User';

export const sendEmailController = async (req: Request, res: Response) => {
    const { email, name } = req.body;
   
    if (!email || !name) {
         res.status(400).json({ error: 'Missing required fields' });
         return
    }
    try {
        const otp = 123456
        const htmlContent = `
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
        const result = await sendEmail({ email, name, subject: "Email verification" as string, htmlContent });
        res.status(200).json({ message: 'Email sent', data: result });
    } catch (error: any) {
        res.status(500).json({ error: error.message || 'Failed to send email' });
    }
};
