import * as dotenv from 'dotenv';
import { IDatabaseConfig } from './intefaces/config.interface';
import { Dialect } from 'sequelize';

dotenv.config();

export const databaseConfig: IDatabaseConfig = {
  dialect: process.env.DATABASE_DIALECT as Dialect,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10),
};
