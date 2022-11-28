import express from 'express';
import hotelController from '../controller/hotelController.js';
import fileUpload from '../services/multerService.js';
import { verifyAdmin } from '../middleware/verifyToken.js';

const router = express.Router();

/* CREATE */
router.post("/", [verifyAdmin, fileUpload.any("images")], hotelController.setHotel);

/* READ */
router.get("/", hotelController.getHotels);
router.get("/find/:id", hotelController.getHotel);
router.get("/countByCity", hotelController.countByCity);
router.get("/countByType", hotelController.countByType);
router.get("/room/:id", hotelController.getHotelRooms);
router.get("/search/:place", hotelController.searchHotel);

/* UPDATE */
router.put("/:id", verifyAdmin, hotelController.updateHotel);

/* DELETE */
router.delete("/:id", verifyAdmin, hotelController.deleteHotel);


export default router;