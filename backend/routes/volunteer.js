import express from "express";
import {
  getLeaderboard,
  getUserDashboard,
  completeTask,
  registerForEvent,
} from "../controllers/volunteerController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/leaderboard", getLeaderboard);
router.get("/dashboard", protect, getUserDashboard);
router.put("/task/:taskId/complete", protect, completeTask);
router.post("/event/:eventId/register", protect, registerForEvent);

export default router;
