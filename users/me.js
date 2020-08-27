import { verify } from 'jsonwebtoken';

export const me = async (req, res) => {

    const JWT_ACCESS_KEY = process.env.JWT_ACCESS_KEY;
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    verify(token, JWT_ACCESS_KEY, () => {
        res.status(200).json({
            id: req.id.id.id
        });
    });
};