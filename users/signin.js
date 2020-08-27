import { sign, verify } from 'jsonwebtoken';
import { compare } from 'bcrypt';

import Users from '../models/users';

const JWT_ACCESS_KEY = process.env.JWT_ACCESS_KEY;
const JWT_REFRESH_KEY = process.env.JWT_REFRESH_KEY;

export const signIn = async (req, res) => {

    const { id, password } = req.body;

    try{

        const foundUser = await Users.findOne({
            where: { id: `${id}` }
        });

        if (!foundUser) {
            return res.status(404).json({
                message: `Такого пользователя не существует`
            });
        }

        const checkedPassword = await compare(password, foundUser.password);

        if (!checkedPassword) {
            res.status(403).json({
                message: 'Неправильный логин или пароль'
            });
        }

        const jwtAccessToken = await sign({ id }, JWT_ACCESS_KEY, {
            expiresIn: '10m'
        });

        const jwtRefreshToken = await sign({ id }, JWT_REFRESH_KEY);
        await Users.update({ refreshToken: jwtRefreshToken }, {
            where: {
                id: foundUser.id
            }
        });

        return res.status(202).json({
            message: 'Аутентификация прошла успешно',
            access_token: jwtAccessToken,
            refresh_token: jwtRefreshToken
        });

    } catch(err) {
        res.status(500).json({
            message: `Ошибка сервера: ${err}`
        });
    }
};

export const signInRefreshToken = async (req, res) => {

    const refreshToken = req.body.token;
    const foundRefreshToken = await Users.findOne({
        where: { refreshToken: `${refreshToken}` }
    });
    if (refreshToken == null) return res.status(401).json({
        message: `Вы не авторизованы`
    });
    if (!foundRefreshToken) return res.status(403).json({
        message: `Доступ запрещен`
    });
    await verify(refreshToken, JWT_REFRESH_KEY, (err, id) => {
        if (err) return res.status(403).json({
            message: `Доступ запрещен`
        });
        const accessToken = sign({ id }, JWT_ACCESS_KEY, {
            expiresIn: '10m'
        });
        res.status(200).json({
            access_token: accessToken
        });
    });
};