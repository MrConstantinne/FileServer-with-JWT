import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const password = process.env.MYSQL_PASSWORD;
const username = process.env.MYSQL_USERNAME;
const database = process.env.MYSQL_DATABASE;
const host = process.env.MYSQL_HOST;
const port = process.env.MYSQL_PORT;

export const sequelize = new Sequelize(database, username, password, {
    host: host,
    port: port,
    dialect: 'mysql'
});


