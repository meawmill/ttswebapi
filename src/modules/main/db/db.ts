import { Pool } from "pg";
import dotenvFlow from "dotenv-flow";

dotenvFlow.config();

export const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  port: Number(process.env.POSTGRES_PORT),
});

export const poolHRM = new Pool({
  host: process.env.POSTGRES_HOST,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE_HRM,
  port: Number(process.env.POSTGRES_PORT),
});

export const poolSaleChkQR = new Pool({
  host: process.env.POSTGRES_HOST,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE_SALECHKQRC,
  port: Number(process.env.POSTGRES_PORT),
});
