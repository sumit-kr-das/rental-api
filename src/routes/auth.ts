import express from "express";
import { loginController } from "../controller/login.controller";
import validate from "../middleware/validateResources";
import { createUserSchema } from "../schema/user.schema";

const router = express.Router();

router.post("/login", validate(createUserSchema), loginController);


export default router;