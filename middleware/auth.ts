import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) =>{
    const JWT_ACCESS_KEY = process.env.JWT_ACCESS_KEY;
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.status(401).json({ message: `You are not logged in` });

    if (JWT_ACCESS_KEY !== undefined) {
        verify(token, JWT_ACCESS_KEY, (err, id) => {
            if (err) res.status(403).json({ message: `Access denied` });
            req.body.id = id;
            req.body.token = token;
            next();
        });
    }
};