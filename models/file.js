import Sequelize from 'sequelize';

import { sequelize } from '../database';

const file = sequelize.define('files', {
    id: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.UUID
    },
    filename: {
        allowNull: false,
        type: Sequelize.STRING
    },
    extname: {
        allowNull: false,
        type: Sequelize.STRING
    },
    pathname: {
        allowNull: false,
        type: Sequelize.STRING
    },
    mime_type: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    size: {
        type: Sequelize.STRING,
        allowNull: false,
    }
})


export default file;