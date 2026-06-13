import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useChat } from "../hooks/useChat";

const Chat = () => {
  const { messages, loading, sendMessage, clearMessages } = useChat();
  const [input, setInput] = React.useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput("");

    try {
      await sendMessage(userMessage);
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const quickReplies = [
    "How do I register as a volunteer?",
    "What volunteering roles are available?",
    "How can I donate?",
    "Generate an Instagram caption about education",
  ];

  return (
    <div className="min-h-screen bg-dark-bg flex flex-col">
      {/* Header */}
      <div className="bg-dark-card border-b border-purple-500/20 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">🦋</span>
            <div>
              <h1 className="text-xl font-bold">Pankh</h1>
              <p className="text-text-secondary text-sm">NayePankh AI Assistant</p>
            </div>
          </div>
          <button
            onClick={clearMessages}
            className="text-text-secondary hover:text-primary transition"
          >
            Clear Chat
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 max-w-4xl mx-auto w-full">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <span className="text-6xl mb-4">🦋</span>
            <h2 className="text-2xl font-bold mb-2">Hi, I'm Pankh!</h2>
            <p className="text-text-secondary mb-8 max-w-md">
              I'm here to help you with any questions about NayePankh Foundation and your volunteering journey.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
              {quickReplies.map((reply, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setInput(reply);
                  }}
                  className="glass p-3 rounded-lg text-left hover:border-primary transition text-sm"
                >
                  {reply}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                    msg.role === "user"
                      ? "bg-primary text-white"
                      : "glass text-text-primary"
                  }`}
                >
                  {msg.content}
                </div>
              </motion.div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="glass px-4 py-3 rounded-lg">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input */}
      <div className="bg-dark-card border-t border-purple-500/20 p-4">
        <div className="max-w-4xl mx-auto flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask me anything..."
            className="flex-1 bg-dark-bg border border-primary/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
            disabled={loading}
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="btn-gradient px-6 py-3 rounded-lg text-white font-bold disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
