import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || "http://127.0.0.1:8000";

// Chat with AI Copilot
export const chatWithAI = catchAsyncErrors(async (req, res, next) => {
  const { message, conversation_id, history } = req.body;

  if (!message) {
    return next(new ErrorHandler("Message is required", 400));
  }

  try {
    const response = await fetch(`${AI_SERVICE_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message,
        conversation_id,
        history: history || [],
        user_id: req.user ? req.user._id : null,
      }),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      return next(
        new ErrorHandler(
          errData.detail || "AI Service encountered an error",
          response.status
        )
      );
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return next(
      new ErrorHandler(
        `AI Service unreachable at ${AI_SERVICE_URL}. Please ensure FastAPI is running. Details: ${error.message}`,
        503
      )
    );
  }
});

// Appraise Item via RAG historical comps
export const appraiseItem = catchAsyncErrors(async (req, res, next) => {
  const { title, category, condition } = req.body;

  if (!title) {
    return next(new ErrorHandler("Item title is required for appraisal", 400));
  }

  try {
    const response = await fetch(`${AI_SERVICE_URL}/api/appraise`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        category,
        condition: condition || "Used",
      }),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      return next(
        new ErrorHandler(
          errData.detail || "Appraisal service error",
          response.status
        )
      );
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return next(
      new ErrorHandler(
        `AI Service unreachable at ${AI_SERVICE_URL}. Details: ${error.message}`,
        503
      )
    );
  }
});

// Health check of AI Microservice
export const getAIHealth = catchAsyncErrors(async (req, res, next) => {
  try {
    const response = await fetch(`${AI_SERVICE_URL}/health`);
    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(503).json({
      status: "offline",
      message: `FastAPI service at ${AI_SERVICE_URL} is not currently responding`,
    });
  }
});

// Trigger Evaluation Benchmark
export const getEvaluationReport = catchAsyncErrors(async (req, res, next) => {
  try {
    const response = await fetch(`${AI_SERVICE_URL}/api/eval/run`);
    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return next(
      new ErrorHandler(`Could not execute evaluation benchmark: ${error.message}`, 503)
    );
  }
});
