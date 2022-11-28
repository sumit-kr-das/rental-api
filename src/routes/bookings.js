import express from 'express';
import bookingsController from '../controller/bookingsController.js';
import { verifyUser } from '../middleware/verifyToken.js';

const router = express.Router();

/* READ */
router.get("/", verifyUser, bookingsController.getBookings);

/* UPDATE */
router.put("/:id", verifyUser, bookingsController.removeBookings);

export default router;