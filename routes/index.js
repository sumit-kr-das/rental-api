import express from 'express';
const routes = express.Router();

import healthCheckController from '../controller/healthcheck/healthCheckController.js';
import hotelController from '../controller/hotel/hotelController.js'
import loginController from '../controller/auth/loginController.js'
import registerController from '../controller/auth/registerController.js'
import userController from '../controller/user/userController.js';
import roomController from '../controller/room/roomController.js'
import newsLetterController from '../controller/newsLetter/newsLetterController.js';
import bookingsController from '../controller/bookings/bookingsController.js';

import { verifyUser, verifyAdmin } from '../middleware/verifyToken.js';


routes.get("/healthcheck", healthCheckController.healthCheck);

routes.post("/hotel", verifyAdmin, hotelController.setHotel);
routes.put("/hotel/:id", verifyAdmin, hotelController.updateHotel);
routes.delete("/hotel/:id", verifyAdmin, hotelController.deleteHotel);
routes.get("/hotel/find/:id", hotelController.getHotel);
routes.get("/hotel", hotelController.getHotels);

routes.post("/register", registerController.register);
routes.post("/login", loginController.login);

routes.put("/user/:id", verifyUser, userController.updateUserPassword);
routes.delete("/user/:id", verifyUser, userController.deleteUser);
routes.get("/user/:id", verifyUser, userController.getUser);
routes.get("/user", verifyAdmin, userController.getAllUser);

routes.post("/rooms/:hotelid", verifyAdmin, roomController.createRoom);
routes.put("/rooms/:id", verifyAdmin, roomController.updateRoom);
routes.delete("/rooms/:id/:hotelid", verifyAdmin, roomController.deleteRoom);
routes.get("/rooms/:id", roomController.getRoom);
routes.get("/rooms", roomController.getRooms);
routes.put("/rooms/updateAvailability/:id", verifyUser, roomController.updateRoomAvailability);

routes.get("/hotel/countByCity", hotelController.countByCity);
routes.get("/hotel/countByType", hotelController.countByType);
routes.get("/hotel/room/:id", hotelController.getHotelRooms);

routes.get("/hotel/search/:place", hotelController.searchHotel);

routes.post("/newsLetter", newsLetterController.newsLetter);

routes.get("/bookings", verifyUser, bookingsController.getBookings);
routes.put("/bookings/:id", verifyUser, bookingsController.removeBookings);

export default routes;