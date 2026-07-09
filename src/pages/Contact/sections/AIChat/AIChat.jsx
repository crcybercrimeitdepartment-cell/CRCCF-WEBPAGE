import React, { useState, useRef, useEffect } from "react";
import { Bot, Send, User, ArrowLeft, Loader2 } from "lucide-react";
import { aiChatData } from "./AIChatData";

const AIChat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: aiChatData.initialMessage,
      sender: "ai",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesContainerRef = useRef(null);

  // Auto-scroll to bottom when a new message is added
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    container.scrollTo({
      top: container.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isTyping]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // 1. Add User Message
    const newUserMsg = { id: Date.now(), text: inputValue, sender: "user" };
    setMessages((prev) => [...prev, newUserMsg]);
    setInputValue("");
    setIsTyping(true);

    // 2. Simulate AI thinking and replying
    setTimeout(() => {
      const aiReply = {
        id: Date.now() + 1,
        text: aiChatData.aiReplyMessage,
        sender: "ai",
      };
      setMessages((prev) => [...prev, aiReply]);
      setIsTyping(false);
    }, aiChatData.aiReplyDelayMs);
  };

  return (
    <div className="max-w-4xl mx-auto h-[80vh] flex flex-col bg-white rounded-3xl shadow-sm border border-slate-100 animate-[fadeIn_0.3s_ease-out] overflow-hidden">
      {/* --- HEADER --- */}
      <div className="flex items-center gap-4 p-5 sm:p-6 border-b border-slate-100 bg-white z-10">
        <button
          onClick={() => window.history.back()}
          className="p-2 bg-slate-50 text-slate-500 rounded-full hover:bg-primary hover:text-white transition-all shadow-sm"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
            <Bot size={24} />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-800 leading-tight">
              {aiChatData.header.title}
            </h2>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {aiChatData.header.status}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* --- CHAT HISTORY AREA --- */}
      <div 
        ref={messagesContainerRef}
        className="flex-1 p-6 overflow-y-auto bg-slate-50/50 space-y-6"
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            {/* AI Avatar */}
            {msg.sender === "ai" && (
              <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 mr-3 mt-auto mb-1">
                <Bot size={16} />
              </div>
            )}

            {/* Message Bubble */}
            <div
              className={`px-5 py-3.5 max-w-[80%] sm:max-w-[70%] text-sm sm:text-base shadow-sm ${
                msg.sender === "user"
                  ? "bg-primary text-white rounded-2xl rounded-tr-sm"
                  : "bg-white text-slate-700 border border-slate-100 rounded-2xl rounded-tl-sm"
              }`}
            >
              {msg.text}
            </div>

            {/* User Avatar */}
            {msg.sender === "user" && (
              <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center shrink-0 ml-3 mt-auto mb-1">
                <User size={16} />
              </div>
            )}
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 mr-3">
              <Bot size={16} />
            </div>
            <div className="px-5 py-4 bg-white border border-slate-100 rounded-2xl rounded-tl-sm shadow-sm flex gap-1.5 items-center">
              <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce"></span>
              <span
                className="w-2 h-2 bg-slate-300 rounded-full animate-bounce"
                style={{ animationDelay: "0.15s" }}
              ></span>
              <span
                className="w-2 h-2 bg-slate-300 rounded-full animate-bounce"
                style={{ animationDelay: "0.3s" }}
              ></span>
            </div>
          </div>
        )}
      </div>

      {/* --- INPUT AREA --- */}
      <div className="p-4 sm:p-6 bg-white border-t border-slate-100">
        <form onSubmit={handleSendMessage} className="flex gap-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={aiChatData.inputPlaceholder}
            className="flex-1 bg-slate-50 border border-slate-200 text-slate-700 text-sm sm:text-base rounded-xl px-5 py-3.5 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isTyping}
            className="px-5 py-3.5 bg-primary text-white rounded-xl shadow-md hover:bg-primary/90 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isTyping ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <Send size={20} />
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AIChat;
