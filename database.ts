import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const password = process.env.MYSQL_PASSWORD || `root`;
const username = process.env.MYSQL_USERNAME || `noon`;
const database = process.env.MYSQL_DATABASE || `test`;
const host = process.env.MYSQL_HOST || `localhost`;
const port = parseInt(`${ process.env.MYSQL_PORT }`) || 3306;

export const sequelize = new Sequelize(database, username, password, {
    host,
    port,
    dialect: 'mysql'
});
