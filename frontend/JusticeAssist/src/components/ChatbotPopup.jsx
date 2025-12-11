

import React, { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import Lottie from "lottie-react";
// DELETED: import chatbotAnim from "../assets/ChatbotHelp.json"; 
import "./ChatbotPopup.css";
import axios from "axios";

const ChatbotPopup = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hello 👋 I’m your JusticeAssist chatbot. How can I help you?" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // State for animation
  const [chatbotAnim, setChatbotAnim] = useState(null);

  useEffect(() => {
    // Lazy load the animation
    fetch('/animations/ChatbotHelp.json')
      .then(res => res.json())
      .then(data => setChatbotAnim(data))
      .catch(err => console.log("Chatbot anim load failed", err));
  }, []);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { from: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication error. Please log in again.");
      }

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/ai/get-guidance`,
        { query: userMessage.text },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const botResponse = {
        from: "bot",
        text: response.data.guidance || "I received a response, but it was empty.",
      };
      setMessages((prev) => [...prev, botResponse]);

    } catch (err) {
      console.error("ChatbotPopup API error:", err);
      const errorMessage = err.response?.status === 401
        ? "Your session has expired. Please log in again."
        : "Sorry, I'm having trouble connecting to the server.";

      const errorResponse = { from: "bot", text: `⚠️ ${errorMessage}` };
      setMessages((prev) => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div>
      <button className="chatbot-button" onClick={() => setOpen(!open)}>
        {chatbotAnim && (
            <Lottie animationData={chatbotAnim} loop={true} className="chatbot-lottie" />
        )}
      </button>

      {open && (
        <div className="chatbot-popup">
          <div className="chatbot-header">
            <h3>JusticeAssist Chatbot</h3>
            <button onClick={() => setOpen(false)}>
              <IoMdClose size={20} />
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chatbot-message ${msg.from}`}
              >
                {msg.text}
              </div>
            ))}
            {isLoading && <div className="chatbot-message bot">Typing...</div>}
          </div>

          <div className="chatbot-input-container">
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="chatbot-input"
              disabled={isLoading}
            />
            <button className="chatbot-send-btn" onClick={handleSend} disabled={isLoading}>
              ➤
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotPopup;