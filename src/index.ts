import express from 'express';
import config from 'config';
import connection from './utils/connect';
import logger from './utils/logger';

import authRoutes from './routes/auth';


const app = express()
const port = config.get<number>('port');
const host = config.get<string>('host');

/* MIDDLEWARES */
app.use(express.json());

/* ROUTES */
app.use("/api/v1/auth",authRoutes);


/* SERVER & DB CONNECTION */
app.listen(port, async () => {
    await connection();
    logger.info(`Listening on ${host}${port}/`);
})