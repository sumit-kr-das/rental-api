import express from 'express';
import config from 'config';
import connection from './utils/connect';
import logger from './utils/logger';


const app = express()
const port = config.get<number>('port');
const host = config.get<string>('host');

app.get("/",(req, res) => {
    res.send("Gello")
})

app.listen(port, async () => {
    await connection();
    logger.info(`Listening on ${host}${port}/`);
})