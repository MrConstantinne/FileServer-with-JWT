import { Response, Request } from 'express';
import { verify } from 'jsonwebtoken';

export const me = async (req: Request, res: Response) => {
    const { id } = req.body;
    const JWT_ACCESS_KEY = process.env.JWT_ACCESS_KEY;
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (typeof token === 'string' && JWT_ACCESS_KEY !== undefined) {
        verify(token, JWT_ACCESS_KEY, () => {
            res.json({ id });
        });
    }
};