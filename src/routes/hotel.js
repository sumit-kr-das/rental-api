import express from "express";
import hotelController from "../controller/hotelController.js";
import fileUpload from "../services/multerService.js";
import { verifyHotel } from "../middleware/verifyToken.js";

const router = express.Router();

/* CREATE */
router.post(
  "/",
  [verifyHotel, fileUpload.array("images")],
  hotelController.setHotel
);

/* READ */
router.get("/", hotelController.getHotels);
router.get("/getUsersHotel", verifyHotel, hotelController.getUsersHotel);
router.get("/find/:id", hotelController.getHotel);
router.get("/countByCity", hotelController.countByCity);
router.get("/countByType", hotelController.countByType);
router.get("/room/:id", hotelController.getHotelRooms);
router.get("/search/:place", hotelController.searchHotel);

/* UPDATE */
router.put(
  "/",
  [verifyHotel, fileUpload.array("images")],
  hotelController.updateHotel
);

/* DELETE */
router.delete("/:id", verifyHotel, hotelController.deleteHotel);

export default router;
