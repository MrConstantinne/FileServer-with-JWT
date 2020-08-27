import { sign } from 'jsonwebtoken';
import { hash } from 'bcrypt';

import Users from '../models/users';

export const signUp = async (req, res) => {

    const { id, password } = req.body;

    const JWT_ACCESS_KEY = process.env.JWT_ACCESS_KEY;
    const JWT_REFRESH_KEY = process.env.JWT_REFRESH_KEY;

    if (id.trim() === '') {
        return res.status(403).json({
            message: `ID не может быть пустым`
        });
    }
    if (password.trim() === '') {
        return res.status(403).json({
            message: 'Пароль не может быть пустым'
        })
    }

    try{

        const foundUser = await Users.findOne({
            where: { id: `${id}` }
        });

        if (foundUser) {
            return res.status(403).json({
                message: `Пользователь уже зарегистрирован`
            });
        }

        const hashPassword = await hash(password, 12);

        const jwtAccessToken = await sign({ id }, JWT_ACCESS_KEY, {
            expiresIn: '10m'
        });

        const jwtRefreshToken = await sign({ id }, JWT_REFRESH_KEY);

        await Users.create({
            id,
            password: hashPassword,
            refreshToken: jwtRefreshToken
        });

        res.status(201).json({
            message: 'Пользователь создан',
            access_token: jwtAccessToken,
            refresh_token: jwtRefreshToken
        });

    } catch(err) {
        res.status(500).json({
            message: `Ошибка сервера: ${ err }`
        });
    }
};