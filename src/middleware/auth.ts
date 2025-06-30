import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

export interface AuthRequest extends Request {
    user?: any; // You can type this more specifically if needed
}

const authenticateToken = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ error: 'Authorization token missing' });
        return
    }

    const token = authHeader.split(' ')[1];
    console.log('token',token)

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // Attach decoded payload to request
        next();
    } catch (err) {
        res.status(403).json({ error: 'Invalid or expired token' });
        return
    }
};


export default authenticateToken