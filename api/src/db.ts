// import pgp from 'pg-promise';
import pgpromise from 'pg-promise';

import dotenv from 'dotenv';
const pgp = pgpromise();

dotenv.config();

// const connectionString = `postgres://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
const cn = {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  // user: 'dao',
  // password: 'dao',
  max: 30 // use up to 30 connections
};

const db = pgp(cn);
export { db };
