import { Router } from 'express';

import { signIn, signInRefreshToken } from '../users/signin';
import { authenticateToken } from '../middleware/auth';
import { signUp } from '../users/signup';
import { logout } from '../users/logout';
import { me } from '../users/me';

const users = Router();

users.get(
    '/info',
    authenticateToken,
    me
);

users.post(
    '/signup',
    signUp
);

users.post(
    '/signin',
    signIn
);

users.post(
    '/signin/new_token',
    signInRefreshToken
);

users.get(
    '/logout',
    authenticateToken,
    logout
);

export default users;