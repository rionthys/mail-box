import { Dialect } from 'sequelize';

export interface IDatabaseConfig {
  dialect?: Dialect;
  username?: string;
  password?: string;
  database?: string;
  host?: string;
  port?: number;
  urlDatabase?: string;
}
