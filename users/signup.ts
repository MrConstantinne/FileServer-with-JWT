import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import { hash } from 'bcrypt';
import Users from '../models/users';

export const signUp = async (req: Request, res: Response) => {
    const { id, password } = req.body;
    const JWT_ACCESS_KEY = process.env.JWT_ACCESS_KEY;
    const JWT_REFRESH_KEY = process.env.JWT_REFRESH_KEY;
    if (id?.trim() === '') {
        return res.status(400).json({ message: `The ID cannot be empty` });
    }
    if (password?.trim() === '') {
        return res.status(400).json({ message: 'The password cannot be empty' });
    }
    try{
        const foundUser = await Users.findOne({ where: { id: `${id}` } });
        if (foundUser) {
            return res.status(400).json({ message: `The user is already registered` });
        }
        const hashPassword = await hash(password, 12);
        const jwtAccessToken = sign({id}, JWT_ACCESS_KEY, {expiresIn: '10m'});
        const jwtRefreshToken = sign({id}, JWT_REFRESH_KEY);
        await Users.create({
            id,
            password: hashPassword,
            refreshToken: jwtRefreshToken
        });
        res.status(201).json({
            message: 'User created',
            access_token: jwtAccessToken,
            refresh_token: jwtRefreshToken
        });
    } catch(err) {
        res.status(500).json({ message: `Error: ${ err }` });
    }
};