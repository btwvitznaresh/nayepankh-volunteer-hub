import express from "express";
import { chat, generateCaption } from "../controllers/chatController.js";

const router = express.Router();

router.post("/", chat);
router.post("/generate-caption", generateCaption);

export default router;
