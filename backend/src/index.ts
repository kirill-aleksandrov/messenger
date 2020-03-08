import dotenv from 'dotenv';
import express from 'express';
import { createConnection } from 'typeorm';
import { entities } from './entities';

dotenv.config();

createConnection({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities,
    synchronize: true,
}).then(() => {
    const app = express();

    app.get('/', (req, res) => res.send('Hello world'));

    app.listen(3000, () => console.log('Running'));
}).catch(console.log);
