"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Technique = void 0;
const sequelize_1 = require("sequelize");
const pg_1 = require("../instances/pg");
exports.Technique = pg_1.sequelize.define('Technique', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        unique: true
    },
    body: {
        type: sequelize_1.DataTypes.STRING
    },
    link: {
        type: sequelize_1.DataTypes.STRING
    },
    reference: {
        type: sequelize_1.DataTypes.STRING
    },
    url_image: {
        type: sequelize_1.DataTypes.STRING
    },
    name_image: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    tableName: 'techniques',
    timestamps: false
});
