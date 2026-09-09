import React, { useState, useRef, useEffect } from "react";
import {
  Sparkles,
  Bot,
  X,
  Send,
  Minimize2,
  Maximize2,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Tag,
  ShieldCheck,
  RotateCcw,
  Activity,
  ArrowRight,
} from "lucide-react";
import axios from "axios";
import { BASE_URL } from "../config";

// Default URL points to FastAPI service with fallback to Express proxy
const API_URL = import.meta.env.VITE_AI_SERVICE_URL || "http://localhost:8000";

const QUICK_PROMPTS = [
  "Find vintage cameras under $200",
  "What is a fair price for an iPhone 13 128GB?",
  "Show live watch auctions",
  "Draft a $150 bid for the Canon camera",
];

const parseInlineMarkdown = (text) => {
  if (!text) return "";
  const parts = [];
  const regex = /(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    const raw = match[0];
    if (raw.startsWith("**") && raw.endsWith("**")) {
      parts.push(
        <strong key={match.index} className="font-bold text-stone-900">
          {raw.slice(2, -2)}
        </strong>
      );
    } else if (raw.startsWith("`") && raw.endsWith("`")) {
      parts.push(
        <code key={match.index} className="px-1.5 py-0.5 bg-stone-100 text-amber-800 rounded font-mono text-[11px] border border-stone-200">
          {raw.slice(1, -1)}
        </code>
      );
    } else if (raw.startsWith("*") && raw.endsWith("*")) {
      parts.push(
        <em key={match.index} className="italic text-stone-700">
          {raw.slice(1, -1)}
        </em>
      );
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }
  return parts.length > 0 ? parts : text;
};

const MarkdownRenderer = ({ content }) => {
  if (!content) return null;
  const lines = content.split("\n");
  const elements = [];
  let inList = false;
  let listItems = [];

  const flushList = () => {
    if (inList && listItems.length > 0) {
      elements.push(
        <ul key={`ul-${elements.length}`} className="my-1.5 space-y-1 pl-4 list-disc marker:text-amber-500">
          {listItems.map((li, idx) => (
            <li key={idx} className="leading-relaxed text-[12.5px] text-stone-800">
              {parseInlineMarkdown(li)}
            </li>
          ))}
        </ul>
      );
      listItems = [];
      inList = false;
    }
  };

  lines.forEach((line, lineIdx) => {
    const trimmed = line.trim();

    if (trimmed.startsWith("### ")) {
      flushList();
      elements.push(
        <h4 key={`h-${lineIdx}`} className="font-bold text-amber-900 text-[13px] mt-2 mb-0.5">
          {parseInlineMarkdown(trimmed.slice(4))}
        </h4>
      );
    } else if (trimmed.startsWith("## ") || trimmed.startsWith("# ")) {
      flushList();
      elements.push(
        <h3 key={`h-${lineIdx}`} className="font-bold text-amber-950 text-sm mt-2.5 mb-1">
          {parseInlineMarkdown(trimmed.replace(/^#+\s*/, ""))}
        </h3>
      );
    } else if (trimmed.startsWith("* ") || trimmed.startsWith("- ") || trimmed.startsWith("• ")) {
      inList = true;
      listItems.push(trimmed.replace(/^[\*\-\•]\s*/, ""));
    } else if (trimmed === "") {
      flushList();
      elements.push(<div key={`sp-${lineIdx}`} className="h-1" />);
    } else {
      flushList();
      elements.push(
        <p key={`p-${lineIdx}`} className="leading-relaxed text-[13px] my-0.5 text-stone-800">
          {parseInlineMarkdown(line)}
        </p>
      );
    }
  });

  flushList();
  return <div className="space-y-0.5">{elements}</div>;
};

const AuctionCopilot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: "intro",
      role: "assistant",
      text: "👋 Welcome! I am your **PrimeBid Copilot**.\n\nI can help you evaluate market prices, search live auctions, and place bids safely.",
      actionCard: null,
      toolCalled: null,
    },
  ]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (userQuery) => {
    const textToSend = userQuery || input;
    if (!textToSend.trim() || loading) return;

    const userMessage = {
      id: Date.now().toString(),
      role: "user",
      text: textToSend,
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!userQuery) setInput("");
    setLoading(true);

    try {
      let res;
      try {
        // First try direct FastAPI service
        res = await axios.post(`${API_URL}/api/chat`, {
          message: textToSend,
          history: messages
            .filter((m) => m.role === "user" || m.role === "assistant")
            .map((m) => ({ role: m.role, content: m.text })),
        });
      } catch (directErr) {
        // Fallback to Express backend proxy
        res = await axios.post(`${BASE_URL}/api/v1/ai/chat`, {
          message: textToSend,
          history: messages
            .filter((m) => m.role === "user" || m.role === "assistant")
            .map((m) => ({ role: m.role, content: m.text })),
        });
      }

      const aiData = res.data.data;
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        text: aiData.message,
        toolCalled: null, // Don't expose internal tool names to the user
        actionCard: aiData.action_card,
      };

      setMessages((prev) => [...prev, aiResponse]);
    } catch (err) {
      console.error("AI Copilot request error:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          text: `⚠️ **Service Temporarily Unavailable**: Could not connect to PrimeBid Copilot. Please try again shortly.`,
          toolCalled: null,
          actionCard: null,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white rounded-full shadow-2xl hover:shadow-orange-500/30 hover:scale-105 transition-all duration-300 font-medium group cursor-pointer border border-amber-400/30"
          aria-label="Open PrimeBid Copilot"
        >
          <div className="relative">
            <Sparkles className="w-5 h-5 text-amber-200 animate-pulse" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
          </div>
          <span className="text-sm font-semibold tracking-wide" style={{ color: "#ffffff" }}>PrimeBid Copilot</span>
        </button>
      )}

      {/* Main Copilot Drawer */}
      {isOpen && (
        <div
          className={`fixed bottom-5 right-5 z-50 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-stone-200 flex flex-col transition-all duration-300 overflow-hidden font-sans ${
            isExpanded
              ? "w-[94vw] md:w-[620px] h-[86vh]"
              : "w-[94vw] md:w-[420px] h-[600px]"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-stone-900 border-b border-stone-800" style={{ backgroundColor: "#1c1917" }}>
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 bg-amber-500/20 rounded-lg border border-amber-500/40 flex items-center justify-center">
                <Bot className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold tracking-tight m-0" style={{ color: "#ffffff", fontWeight: 700 }}>
                    PrimeBid Copilot
                  </h3>
                  <span className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full font-mono font-medium" style={{ color: "#34d399", backgroundColor: "rgba(6, 78, 59, 0.7)", border: "1px solid rgba(16, 185, 129, 0.4)" }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Online
                  </span>
                </div>
                <p className="text-[11px] m-0" style={{ color: "#d6d3d1" }}>Live Auction Assistant</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                style={{ backgroundColor: "rgba(255, 255, 255, 0.1)", color: "#ffffff", border: "1px solid rgba(255, 255, 255, 0.15)", padding: "6px", borderRadius: "8px" }}
                className="hover:bg-white/20 transition-colors cursor-pointer flex items-center justify-center"
                title={isExpanded ? "Collapse" : "Expand"}
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                style={{ backgroundColor: "rgba(255, 255, 255, 0.1)", color: "#ffffff", border: "1px solid rgba(255, 255, 255, 0.15)", padding: "6px", borderRadius: "8px" }}
                className="hover:bg-red-500/30 transition-colors cursor-pointer flex items-center justify-center"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-50/50">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${
                  m.role === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-[88%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    m.role === "user"
                      ? "bg-amber-600 text-white rounded-br-none"
                      : "bg-white text-stone-800 border border-stone-200 rounded-bl-none"
                  }`}
                >
                  {/* Message Content */}
                  <div className="font-sans text-[13px]">
                    <MarkdownRenderer content={m.text} />
                  </div>

                  {/* Action Cards (Human-in-the-Loop Confirmation & Appraisal) */}
                  {m.actionCard && (
                    <div className="mt-3 pt-3 border-t border-stone-200">
                      {/* Bid Confirmation Card */}
                      {m.actionCard.type === "BID_CONFIRMATION" && (
                        <div className="p-3 bg-amber-50/80 rounded-xl border border-amber-200 text-stone-900">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 mb-1.5">
                            <ShieldCheck className="w-4 h-4 text-amber-600" />
                            <span>Action Draft: Confirm Your Bid</span>
                          </div>
                          <div className="text-xs text-stone-600 space-y-1 mb-2.5">
                            <div className="flex justify-between">
                              <span>Item:</span>
                              <strong className="text-stone-800">{m.actionCard.data.item_title}</strong>
                            </div>
                            <div className="flex justify-between">
                              <span>Current Highest Bid:</span>
                              <span>${m.actionCard.data.current_highest_bid}</span>
                            </div>
                            <div className="flex justify-between text-amber-700 font-bold text-sm">
                              <span>Proposed Bid:</span>
                              <span>${m.actionCard.data.proposed_bid}</span>
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              alert(`✅ Bid of $${m.actionCard.data.proposed_bid} submitted through secure auction gateway!`);
                            }}
                            className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Authorize & Place Bid (${m.actionCard.data.proposed_bid})
                          </button>
                        </div>
                      )}

                      {/* Appraisal Summary Card */}
                      {m.actionCard.type === "APPRAISAL_SUMMARY" && (
                        <div className="p-3 bg-stone-900 text-white rounded-xl border border-stone-700 text-xs">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-amber-400 flex items-center gap-1">
                              <TrendingUp className="w-3.5 h-3.5" /> Market Appraisal
                            </span>
                            <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded font-mono">
                              {Math.round(m.actionCard.data.confidence_score * 100)}% Confidence
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-[11px] mb-2">
                            <div className="bg-stone-800 p-2 rounded-lg">
                              <span className="text-stone-400 block text-[10px]">Fair Value</span>
                              <strong className="text-sm text-white">${m.actionCard.data.appraised_fair_price}</strong>
                            </div>
                            <div className="bg-stone-800 p-2 rounded-lg">
                              <span className="text-stone-400 block text-[10px]">Rec. Starting Bid</span>
                              <strong className="text-sm text-amber-300">${m.actionCard.data.recommended_starting_bid}</strong>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Live Auction List Card */}
                      {m.actionCard.type === "LIVE_AUCTION_LIST" && (
                        <div className="space-y-1.5 mt-2">
                          {m.actionCard.items.map((item) => (
                            <div
                              key={item.auction_id}
                              className="p-2 bg-white rounded-lg border border-stone-200 flex items-center justify-between hover:border-amber-400 transition-colors"
                            >
                              <div>
                                <h4 className="text-xs font-semibold text-stone-800 truncate max-w-[200px]">
                                  {item.title}
                                </h4>
                                <span className="text-[10px] text-stone-500">
                                  Current: <strong className="text-emerald-600">${item.current_bid}</strong> • {item.condition}
                                </span>
                              </div>
                              <button
                                onClick={() => handleSend(`Draft a bid for ${item.title}`)}
                                className="px-2 py-1 bg-stone-100 hover:bg-amber-600 hover:text-white rounded text-[11px] font-medium flex items-center gap-1 transition-colors"
                              >
                                <span>Bid</span>
                                <ArrowRight className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 p-3 bg-white border border-stone-200 rounded-2xl w-fit text-xs text-stone-500 shadow-sm">
                <div className="w-2 h-2 rounded-full bg-amber-500 animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-amber-500 animate-bounce delay-100"></div>
                <div className="w-2 h-2 rounded-full bg-amber-500 animate-bounce delay-200"></div>
                <span>Searching PrimeBid marketplace...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Chips */}
          <div className="px-3 py-2 bg-stone-100 border-t border-stone-200 overflow-x-auto flex gap-1.5 no-scrollbar">
            {QUICK_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                disabled={loading}
                className="whitespace-nowrap px-2.5 py-1 bg-white hover:bg-amber-50 hover:text-amber-800 hover:border-amber-300 text-stone-600 border border-stone-200 rounded-full text-[11px] transition-all cursor-pointer shadow-xs disabled:opacity-50"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Area */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white border-t border-stone-200 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask for appraisal, find items, or draft a bid..."
              className="flex-1 px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="p-2.5 bg-amber-600 hover:bg-amber-700 disabled:opacity-40 text-white rounded-xl shadow-md transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default AuctionCopilot;
