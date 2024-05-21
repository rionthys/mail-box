import { Sequelize } from 'sequelize-typescript';
import { SEQUELIZE } from '../../common/constants';
import { databaseConfig } from './database.config';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      const sequelize = new Sequelize(databaseConfig);
      await sequelize.authenticate();
      await sequelize.query(`
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          username VARCHAR(255) NOT NULL UNIQUE,
          password VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL UNIQUE
        );
      `);
      return sequelize;
    },
  },
];
