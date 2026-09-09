import express from "express";
import {
  chatWithAI,
  appraiseItem,
  getAIHealth,
  getEvaluationReport,
} from "../controllers/aiController.js";

const router = express.Router();

router.post("/chat", chatWithAI);
router.post("/appraise", appraiseItem);
router.get("/health", getAIHealth);
router.get("/eval/run", getEvaluationReport);

export default router;
