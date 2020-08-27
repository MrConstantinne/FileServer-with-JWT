import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { sequelize } from './database';
import files from './router/files';
import users from './router/users';

dotenv.config();
const app = express();
const PORT = process.env.SERVER_PORT;

app.use(cors());
app.use(express.json());

app.use('/', users);
app.use('/file', files);

const serverStart = () => {
    app.listen(PORT, err => {
        err ? console.error(err)
            : console.info(`Сервер запущен на порту: ${PORT}`);
    });
};

const start = async () => {
    try {
        await Promise.all([
            serverStart(),
            sequelize.sync()
        ]);
    } catch (err) {
        console.error(err);
    }
};

start();