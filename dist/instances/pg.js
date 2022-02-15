"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// const sequelize = new Sequelize(process.env.DATABASE_URL, {
//     dialect: 'postgres',
//     protocol: 'postgres',
//     dialectOptions: {
//         ssl: {
//             require: true,
//             rejectUnauthorized: false
//         }
//     }
// });
// export const sequelize = new Sequelize(
//     process.env.PG_DB as string,
//     process.env.PG_USER as string,
//     process.env.PG_PASSWORD as string,
//     {
//         host: process.env.PG_HOST as string,
//         dialect: 'postgres',
//         port: parseInt(process.env.PG_PORT as string)
//     }
// );
exports.sequelize = new sequelize_1.Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});
