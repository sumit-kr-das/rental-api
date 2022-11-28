import express from 'express';
import newsLetterController from '../controller/newsLetterController.js';

const router = express.Router();

/* CREATE */
router.post("/", newsLetterController.newsLetter);

export default router;