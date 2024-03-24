import express from "express";
import roomController from "../controller/roomController.js";
import {
  verifyAdmin,
  verifyHotel,
  verifyUser,
} from "../middleware/verifyToken.js";

const router = express.Router();

/* CREATE */
router.post("/", verifyHotel, roomController.createRoom);

/* READ */
router.get("/", roomController.getRooms);
router.get("/:id", roomController.getRoom);

/* UPDATE */
router.put("/:id", verifyAdmin, roomController.updateRoom);
router.put(
  "/updateAvailability/:roomId",
  verifyUser,
  roomController.updateRoomAvailability
);

/* DELETE */
router.delete("/:id/:hotelid", verifyAdmin, roomController.deleteRoom);

export default router;
