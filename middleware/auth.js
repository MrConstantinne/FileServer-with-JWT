import { verify } from 'jsonwebtoken';

export const authenticateToken = (req, res, next) =>{
    const JWT_ACCESS_KEY = process.env.JWT_ACCESS_KEY;
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.status(401).json({
        message: `Вы не авторизованы`
    });

    verify(token, JWT_ACCESS_KEY, (err, id) => {
        if (err) return res.status(403).json({
            message: `Доступ запрещен`
        });
        req.id = id;
        console.log(id)
        next();
    });
}