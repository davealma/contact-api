import { Sequelize } from "sequelize";

const db = 'wt_contact';
const username = 'postgres';
const password = ''
const host = 'database';

export const sequelize = new Sequelize(process.env.DATABASE_URL || "");