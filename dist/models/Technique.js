"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const pg_1 = require("../instances/pg");
const Technique = pg_1.sequelize.define('Technique', {
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
const Comment = pg_1.sequelize.define('Comment', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER
    },
    body: {
        type: sequelize_1.DataTypes.STRING
    },
    TechniqueId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: Technique,
            key: 'id'
        }
    }
}, {
    tableName: 'comments',
    timestamps: false
});
Technique.hasMany(Comment);
Comment.belongsTo(Technique);
exports.default = {
    Comment,
    Technique
};
