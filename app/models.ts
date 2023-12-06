import { DataTypes } from "sequelize";
import { sequelize } from "./connection";

export const Contact = sequelize.define('Contact', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING
    },
    phone: {
        type: DataTypes.STRING
    },
    bio: {
        type: DataTypes.STRING
    }
}, {tableName: 'contacts'});