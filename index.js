import express from 'express';
import cors from 'cors';
import connection from './utils/connection.js';
import routes from './routes/index.js';
import errorHandler from './middleware/errorHandler.js';
import cookieParser from "cookie-parser";
import { PORT } from './config/index.js';


const app = express();

app.get("/", (req, res) => {
    res.json({
        title: "Hotel Booking API",
        msg: "hotel reservation api, created for educational perpose",
        lisence: "Sumit Kumar Das",
        gitHub: "https://github.com/sumit-kr-das/hotel-reservation-api",
        releases: "v1"
    });
});

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1",routes);
app.use(errorHandler);

app.listen(PORT , async() => {
    console.log(`Listening on port no ${PORT}`);
    await connection();
});