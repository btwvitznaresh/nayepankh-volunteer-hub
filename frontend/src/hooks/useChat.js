import { useState } from "react";
import api from "../utils/api";

export const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (userMessage) => {
    try {
      setLoading(true);
      const newMessages = [
        ...messages,
        { role: "user", content: userMessage },
      ];

      const response = await api.post("/chat", { messages: newMessages });

      setMessages([
        ...newMessages,
        { role: "assistant", content: response.data.message },
      ]);

      return response.data.message;
    } catch (error) {
      console.error("Chat error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const generateCaption = async (topic) => {
    try {
      setLoading(true);
      const response = await api.post("/chat/generate-caption", { topic });
      return response.data.caption;
    } catch (error) {
      console.error("Caption generation error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const clearMessages = () => {
    setMessages([]);
  };

  return {
    messages,
    loading,
    sendMessage,
    generateCaption,
    clearMessages,
  };
};
