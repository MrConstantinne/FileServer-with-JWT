import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { sequelize } from './database';
import files from './router/files';
import users from './router/users';

dotenv.config();

const app = express();
const PORT = process.env.SERVER_PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/', users);
app.use('/file', files);

sequelize.sync();

app.listen(PORT, () => console.info(`Server listening on port: ${ PORT }`));
