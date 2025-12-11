


import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './AIAssistant.css';
import axios from 'axios';

const AIAssistant = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! I am your AI assistant. How can I help you with your cybercrime-related questions today?", sender: 'ai' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatWindowRef = useRef(null);

  // Automatically scroll to the bottom when new messages are added
  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (input.trim() && !isLoading) {
      const userMessage = { text: input, sender: 'user' };
      setMessages(prevMessages => [...prevMessages, userMessage]);
      setInput('');
      setIsLoading(true);

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Authentication token not found. Please log in.");
        }

        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/ai/get-guidance`,
          { query: input },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const aiResponse = {
          text: response.data.guidance || "I received a response, but it was empty.",
          sender: 'ai'
        };
        setMessages(prevMessages => [...prevMessages, aiResponse]);

      } catch (err) {
        console.error("AI Assistant API error:", err);
        const errorMessage = err.response?.status === 401
          ? "Your session has expired. Please log in again."
          : "Sorry, I'm having trouble connecting to the server right now.";
        
        const errorResponse = { text: `⚠️ ${errorMessage}`, sender: 'ai' };
        setMessages(prevMessages => [...prevMessages, errorResponse]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="ai-assistant-container">
      <div className="chat-header">
        AI Assistant
      </div>
      <div className="chat-window" ref={chatWindowRef}>
        <AnimatePresence>
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              className={`message ${msg.sender}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {msg.text}
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && (
          <motion.div
            className="message ai"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            Typing...
          </motion.div>
        )}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type your message..."
          disabled={isLoading}
        />
        <button onClick={handleSend} disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default AIAssistant;