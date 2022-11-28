import express from 'express';
import registerController from '../controller/auth/registerController.js';
import loginController from '../controller/auth/loginController.js';

const router = express.Router();

/* WRITE */
router.post("/register", registerController.register);
router.post("/login", loginController.login);

export default router;