import express from 'express';
import healthCheckController from '../controller/healthCheckController.js';

const router = express.Router();

router.get("/", (req, res) => {
    res.json({
        title: "Hotel Booking API",
        msg: "hotel reservation api, created for educational perpose",
        lisence: "Sumit Kumar Das",
        gitHub: "https://github.com/sumit-kr-das/hotel-reservation-api",
        releases: "v1"
    });
});

router.get("/healthcheck", healthCheckController.healthCheck);


export default router;