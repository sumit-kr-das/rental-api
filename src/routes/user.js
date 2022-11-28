import express from "express";
import userController from '../controller/userController.js';
import { verifyUser, verifyAdmin } from "../middleware/verifyToken.js";

const router = express.Router();

/* READ */
router.get("/:id", verifyUser, userController.getUser);
router.get("/", verifyAdmin, userController.getAllUser);

/* UPDATE */
router.put("/:id", verifyUser, userController.updateUserPassword);

/* DELETE */
router.delete("/:id", verifyUser, userController.deleteUser);


export default router;