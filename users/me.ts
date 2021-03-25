import { Response, Request } from 'express';
import { verify } from 'jsonwebtoken';

const JWT_ACCESS_KEY = process.env.JWT_ACCESS_KEY;

export const me = async (req: Request, res: Response) => {
    const { id, token } = req.body;
    verify(token, JWT_ACCESS_KEY, () => res.json({ id }))
};
