import Sequelize from 'sequelize';

import { sequelize } from '../database';

const users = sequelize.define('users', {
    id: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.STRING
    },
    password: {
        allowNull: false,
        type: Sequelize.STRING
    },
    refreshToken: {
        type: Sequelize.STRING
    }
})

export default users;
