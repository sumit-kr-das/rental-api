import express from 'express';
import cors from 'cors';
import { PORT_NO } from './config';
import connection from './utils/connection';
import routes from './routes';
import errorHandler from './middleware/errorHandler';
import cookieParser from "cookie-parser";

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use("/api/v1",routes);
app.use(errorHandler);

app.listen(PORT_NO, async() => {
    console.log(`Listening on port no ${PORT_NO}`);
    await connection();
});