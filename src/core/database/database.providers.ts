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
        CREATE TABLE IF NOT EXISTS messages (
            id SERIAL PRIMARY KEY,
            read BOOLEAN DEFAULT FALSE,
            title TEXT NOT NULL,
            content TEXT,
            attachment BYTEA,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            from_email TEXT NOT NULL,
            to_email TEXT NOT NULL
        );
      `);
      return sequelize;
    },
  },
];
