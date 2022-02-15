import { Sequelize } from 'sequelize'; 
import dotenv from 'dotenv';

dotenv.config();

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

export const sequelize = new Sequelize(
    process.env.PG_DB as string,
    process.env.PG_USER as string,
    process.env.PG_PASSWORD as string,
    {
        host: process.env.PG_HOST as string,
        dialect: 'postgres',
        port: parseInt(process.env.PG_PORT as string)
    }
);

//export const sequelize = new Sequelize(process.env.DATABASE_URL as string);