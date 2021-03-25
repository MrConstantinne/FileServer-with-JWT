import { Response, Request } from 'express';
import Users from '../models/users';

export const logout = async (req: Request, res: Response) => {
    const { id } = req.body;
    try {
        await Users.update({ refreshToken: null }, { where: { id } });
        res.sendStatus(204);
    } catch (err) {
        res.status(500).json({
            message: `Error: ${ err }`
        });
    }
};