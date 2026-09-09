import logging
import httpx
from typing import Dict, Any, List, Optional
from config import settings
from rag.vector_store import rag_store
from rag.sample_catalog import LIVE_AUCTION_SEED
from cache.redis_cache import cache_manager

logger = logging.getLogger("ai_service.tools")

class AuctionTools:
    """
    Deterministic tools for the Autonomous Auction Agent.
    Implements strict schema validation, financial guardrails, and cache acceleration.
    """

    @staticmethod
    def search_live_auctions(
        query: str = "",
        category: Optional[str] = None,
        max_price: Optional[float] = None
    ) -> List[Dict[str, Any]]:
        """
        Search live active auctions from the database backend with real-time bids.
        """
        # Fetch live items from Express MongoDB backend
        live_items = []
        try:
            with httpx.Client(timeout=3.0) as client:
                res = client.get(f"{settings.NODE_BACKEND_URL}/api/v1/auctionitem/allitems")
                if res.status_code == 200:
                    live_items = res.json().get("items", [])
        except Exception as e:
            logger.warning(f"Could not fetch live items from backend ({e}), using seed fallback.")

        if not live_items:
            live_items = LIVE_AUCTION_SEED

        results = []
        q_lower = query.lower()

        for item in live_items:
            item_id = str(item.get("_id", ""))
            # Check cached live bid if updated in Redis
            cached_bid = cache_manager.get_json(f"live_bid:{item_id}")
            current_price = cached_bid if cached_bid is not None else item.get("currentBid") or item.get("startingBid", 0)

            # Category filter
            if category and category.lower() != "all" and item.get("category", "").lower() != category.lower():
                continue

            # Price filter
            if max_price is not None and current_price > max_price:
                continue

            # Text query match
            if query:
                title_match = q_lower in item.get("title", "").lower()
                desc_match = q_lower in item.get("description", "").lower()
                cat_match = q_lower in item.get("category", "").lower()
                if not (title_match or desc_match or cat_match):
                    continue

            results.append({
                "auction_id": item_id,
                "title": item.get("title", "Untitled Auction"),
                "category": item.get("category", "General"),
                "condition": item.get("condition", "Used"),
                "current_bid": current_price,
                "starting_bid": item.get("startingBid", 0),
                "end_time": str(item.get("endTime", "")),
                "description": item.get("description", "")
            })

        return results

    @staticmethod
    def get_historical_comps(
        query: str,
        category: Optional[str] = None,
        condition: Optional[str] = None
    ) -> List[Dict[str, Any]]:
        """
        Retrieve historical sold items from the RAG vector store.
        """
        return rag_store.search_comps(query, category=category, condition=condition, top_k=4)

    @staticmethod
    def calculate_fair_price(
        query: str,
        category: Optional[str] = None,
        condition: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Calculate statistical market appraisal based on historical clearance prices.
        """
        return rag_store.appraise_item(query, category=category, condition=condition)

    @staticmethod
    def draft_bid_action(
        auction_id: str,
        item_title: str,
        bid_amount: float,
        current_highest_bid: float,
        user_max_budget: Optional[float] = None
    ) -> Dict[str, Any]:
        """
        Prepares a draft bid with financial safety guardrails.
        Enforces human-in-the-loop: returns a draft card requiring explicit user confirmation.
        """
        # Guardrail 1: Bid must exceed current highest bid
        if bid_amount <= current_highest_bid:
            return {
                "status": "REJECTED_GUARDRAIL",
                "error": f"Bid amount (${bid_amount:.2f}) must be higher than current highest bid (${current_highest_bid:.2f}). Minimum next valid bid is ${current_highest_bid + 5:.2f}."
            }

        # Guardrail 2: Budget ceiling protection
        if user_max_budget and bid_amount > user_max_budget:
            return {
                "status": "REJECTED_GUARDRAIL",
                "error": f"Bid amount (${bid_amount:.2f}) exceeds your stated budget limit (${user_max_budget:.2f})."
            }

        # Guardrail 3: Extreme outlier check (bid cannot exceed 10x current bid in one jump)
        if current_highest_bid > 0 and bid_amount > (current_highest_bid * 10):
            return {
                "status": "REJECTED_GUARDRAIL",
                "error": f"Bid amount (${bid_amount:.2f}) looks abnormally high compared to the current bid (${current_highest_bid:.2f}). Please enter a standard incremental bid."
            }

        # Approved draft for Human-in-the-Loop confirmation
        return {
            "status": "REQUIRES_USER_CONFIRMATION",
            "action": "CONFIRM_BID",
            "auction_id": auction_id,
            "item_title": item_title,
            "proposed_bid": round(bid_amount, 2),
            "current_highest_bid": round(current_highest_bid, 2),
            "suggested_increment": round(bid_amount - current_highest_bid, 2),
            "requires_human_approval": True,
            "confirmation_message": f"Ready to place a bid of ${bid_amount:.2f} on '{item_title}'? Click confirm to authorize the transaction."
        }

# Tool Schemas for LLM Function Calling
TOOL_DEFINITIONS = [
    {
        "type": "function",
        "function": {
            "name": "search_live_auctions",
            "description": "Search active live auctions by keyword, category, or maximum price cap.",
            "parameters": {
                "type": "object",
                "properties": {
                    "query": {"type": "string", "description": "Search keyword (e.g. 'camera', 'iphone', 'watch')"},
                    "category": {"type": "string", "description": "Category name: Cameras, Electronics, Watches, Collectibles"},
                    "max_price": {"type": "number", "description": "Maximum current bid price"}
                },
                "required": []
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "calculate_fair_price",
            "description": "Appraise the fair market value of an item using RAG historical clearing prices.",
            "parameters": {
                "type": "object",
                "properties": {
                    "query": {"type": "string", "description": "Item description or title (e.g. 'Apple iPhone 13 128GB Used')"},
                    "category": {"type": "string", "description": "Optional category"},
                    "condition": {"type": "string", "enum": ["New", "Used"], "description": "Item condition"}
                },
                "required": ["query"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "get_historical_comps",
            "description": "Retrieve recent historical closed auction records and selling prices.",
            "parameters": {
                "type": "object",
                "properties": {
                    "query": {"type": "string", "description": "Item keyword or title to find past sales for"},
                    "category": {"type": "string", "description": "Item category"},
                    "condition": {"type": "string", "description": "Condition (New or Used)"}
                },
                "required": ["query"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "draft_bid_action",
            "description": "Draft a bid proposal for an active auction with financial safety verification. Never executes blindly without human confirmation.",
            "parameters": {
                "type": "object",
                "properties": {
                    "auction_id": {"type": "string", "description": "The auction ID"},
                    "item_title": {"type": "string", "description": "Item title"},
                    "bid_amount": {"type": "number", "description": "The amount the user wants to bid"},
                    "current_highest_bid": {"type": "number", "description": "The current highest bid on the item"},
                    "user_max_budget": {"type": "number", "description": "Optional maximum budget ceiling specified by user"}
                },
                "required": ["auction_id", "item_title", "bid_amount", "current_highest_bid"]
            }
        }
    }
]
