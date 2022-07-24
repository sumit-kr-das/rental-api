import express from 'express';
const routes = express.Router();
import {
    hotelController,
    loginController,
    registerController,
    userController,
    roomController
} from '../controller';
import { 
    verifyUser,
    verifyAdmin
} from '../middleware/verifyToken';


routes.get("/healthcheck", (req, res) => {
    res.sendStatus(200);
});

routes.post("/hotel", verifyAdmin, hotelController.setHotel);
routes.put("/hotel/:id", verifyAdmin, hotelController.updateHotel);
routes.delete("/hotel/:id", verifyAdmin, hotelController.deleteHotel);
routes.get("/hotel/find/:id", hotelController.getHotel);
routes.get("/hotel", hotelController.getHotels);

routes.post("/register", registerController.register);
routes.post("/login", loginController.login);

// routes.get("/authenticate/:id", verifyAdmin,(req,res,next) => {
//     res.send("You are authenticate");
// })
routes.put("/user/:id", verifyUser, userController.updateUserPassword);
routes.delete("/user/:id", verifyUser, userController.deleteUser);
routes.get("/user/:id", verifyUser, userController.getUser);
routes.get("/user", verifyAdmin, userController.getAllUser);

routes.post("/rooms/:hotelid", verifyAdmin, roomController.createRoom);
routes.put("/rooms/:id", verifyAdmin, roomController.updateRoom);
routes.delete("/rooms/:id/:hotelid", verifyAdmin, roomController.deleteRoom);
routes.get("/rooms/:id", roomController.getRoom);
routes.get("/rooms", roomController.getRooms);

routes.get("/hotel/countByCity", roomController.countByCity);
routes.get("/hotel/countByType", roomController.countByType);
routes.get("/hotel/room/:id", roomController.getHotelRooms);

export default routes;