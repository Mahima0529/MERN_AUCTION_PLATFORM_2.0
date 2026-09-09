import json
import asyncio
import logging
from typing import Optional, List, Dict, Any
from fastapi import FastAPI, HTTPException, Request, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, Field

from config import settings
from cache.redis_cache import cache_manager
from agent.auction_agent import auction_agent
from rag.vector_store import rag_store
from evals.eval_runner import run_evaluation

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("ai_service")

app = FastAPI(
    title="PrimeBid AI Microservice",
    description="Auction Copilot, RAG Market Appraiser, and Autonomous Bidding Agent",
    version="1.0.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows requests from React frontend and Node.js backend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request / Response Pydantic Models
class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    message: str = Field(..., description="User query or bidding instruction")
    conversation_id: Optional[str] = Field(None, description="Client session identifier")
    history: Optional[List[ChatMessage]] = Field(default=[], description="Past conversation turns")
    user_id: Optional[str] = Field(None, description="Authenticated User ID")

class AppraisalRequest(BaseModel):
    title: str = Field(..., description="Title of the auction item to appraise")
    category: Optional[str] = Field(None, description="Category name")
    condition: Optional[str] = Field("Used", description="Condition: New or Used")

# Rate Limiting Dependency
def rate_limit_check(request: Request):
    client_ip = request.client.host if request.client else "unknown"
    if not cache_manager.check_rate_limit(client_ip):
        raise HTTPException(
            status_code=429,
            detail=f"Rate limit exceeded. Maximum {settings.RATE_LIMIT_REQUESTS_PER_MIN} requests per minute."
        )

@app.get("/health")
def health_check():
    """Health check endpoint exposing service and cache status."""
    return {
        "status": "healthy",
        "service": "PrimeBid AI Microservice",
        "provider": settings.LLM_PROVIDER,
        "cache": cache_manager.status
    }

@app.post("/api/chat", dependencies=[Depends(rate_limit_check)])
def chat_endpoint(payload: ChatRequest):
    """
    Standard synchronous chat endpoint.
    Executes tool-calling agent, RAG lookup, and returns structured action cards.
    """
    history_dicts = [{"role": m.role, "content": m.content} for m in payload.history]
    result = auction_agent.chat(payload.message, history=history_dicts)
    return {
        "success": True,
        "data": result
    }

@app.post("/api/chat/stream", dependencies=[Depends(rate_limit_check)])
async def chat_stream_endpoint(payload: ChatRequest):
    """
    Server-Sent Events (SSE) streaming endpoint.
    Simulates real-time token delivery to eliminate perceived latency in live auctions.
    """
    history_dicts = [{"role": m.role, "content": m.content} for m in payload.history]
    result = auction_agent.chat(payload.message, history=history_dicts)
    full_message = result.get("message", "")

    async def token_generator():
        # Stream message chunk by chunk
        words = full_message.split(" ")
        for i, word in enumerate(words):
            chunk_data = json.dumps({"token": word + (" " if i < len(words) - 1 else "")})
            yield f"data: {chunk_data}\n\n"
            await asyncio.sleep(0.018)  # 18ms per word simulates smooth LLM streaming

        # Final event with complete payload and action cards
        final_data = json.dumps({
            "done": True,
            "tool_called": result.get("tool_called"),
            "action_card": result.get("action_card")
        })
        yield f"data: {final_data}\n\n"

    return StreamingResponse(token_generator(), media_type="text/event-stream")

@app.post("/api/appraise")
def appraise_endpoint(payload: AppraisalRequest):
    """
    Direct RAG appraisal for auctioneers creating new items.
    Calculates estimated fair clearing price and recommended starting bid.
    """
    appraisal = rag_store.appraise_item(
        query=payload.title,
        category=payload.category,
        condition=payload.condition
    )
    return {
        "success": True,
        "data": appraisal
    }

@app.get("/api/eval/run")
def run_eval_endpoint():
    """
    Executes the automated AI evaluation benchmark.
    Returns metrics on tool accuracy, guardrails, and latency.
    """
    report = run_evaluation()
    return {
        "success": True,
        "report": report
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host=settings.HOST, port=settings.PORT)
