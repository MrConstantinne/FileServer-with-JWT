import { Request, Response } from 'express';
import { sign, verify } from 'jsonwebtoken';
import { compare } from 'bcrypt';

import Users from '../models/users';

const JWT_ACCESS_KEY = process.env.JWT_ACCESS_KEY;
const JWT_REFRESH_KEY = process.env.JWT_REFRESH_KEY;

export const signIn = async (req: Request, res:Response) => {
    const { id, password } = req.body;
    try{
        const foundUser = await Users.findOne({ where: id });
        if (!foundUser) {
            return res.status(404).json({ message: `There is no such user` });
        }

        const checkedPassword = await compare(password, foundUser.password);
        if (!checkedPassword) {
            res.status(403).json({ message: 'Incorrect username or password' });
        }

        const jwtAccessToken = sign({id}, JWT_ACCESS_KEY, {expiresIn: '10m'});
        const jwtRefreshToken = sign({id}, JWT_REFRESH_KEY);

        await Users.update({ refreshToken: jwtRefreshToken }, { where: { id: foundUser.id } });

        return res.status(202).json({
            message: 'Authentication was successful',
            access_token: jwtAccessToken,
            refresh_token: jwtRefreshToken
        });
    } catch(err) {
        res.status(500).json({ message: `Error: ${err}` });
    }
};

export const signInRefreshToken = async (req: Request, res: Response) => {
    const refreshToken = req.body.token;
    const foundRefreshToken = await Users.findOne({ where: refreshToken });
    if (refreshToken == null) {
        return res.status(401).json({ message: `You are not logged in` });
    }
    if (!foundRefreshToken) { return res.status(403).json({ message: `Access denied` }); }
    verify(refreshToken, JWT_REFRESH_KEY, (err, id) => {
        if (err) {
            return res.status(403).json({ message: `Access denied` });
        }
        const accessToken = sign({id}, JWT_ACCESS_KEY, {expiresIn: '10m'});
        res.json({access_token: accessToken});
    });
};