import React, { useState, useEffect, useRef } from "react";
import { FaTimes } from "react-icons/fa";
import "./AIChat.css";

const AIChat = () => {
  // Chat states
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "ai",
      text: "Welcome to AXIS'25 AI Assistant. How can I help you with quantum computing and technology?",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [apiKey, setApiKey] = useState(""); // Add your OpenAI API key here
  const [isChatOpen, setIsChatOpen] = useState(false); // Toggle for compact/expanded state

  // Auto-scroll to bottom
  const messagesEndRef = useRef(null);

  // Sample AI responses for fallback
  const aiResponses = [
    "I've analyzed the quantum fluctuations in your request. Here's what I found...",
    "According to my neural network, this seems to be an interesting challenge.",
    "My algorithms suggest several approaches to your question.",
    "I've processed your request through my quantum computing matrix.",
    "Based on my data analysis, I can provide you with these insights.",
  ];

  // Scrolls to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Function to call OpenAI API
  const callOpenAI = async (userMessage) => {
    setIsLoading(true);

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content:
                "You are the AI assistant for AXIS'25, a futuristic quantum computing conference. Your name is QUANTUM NEXUS AI. Keep responses concise, informative, and slightly cyberpunk in tone. Refer to cutting-edge technology and quantum computing concepts when relevant. Respond as if you're an advanced AI running on quantum hardware.",
            },
            {
              role: "user",
              content: userMessage,
            },
          ],
          max_tokens: 150,
        }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();

      const aiResponse = {
        id: Date.now(),
        sender: "ai",
        text: data.choices[0].message.content.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      console.error("Error calling OpenAI API:", error);

      const errorResponse = {
        id: Date.now(),
        sender: "ai",
        text: `I'm currently experiencing technical difficulties with my quantum circuits. Please try again in a moment. Error: ${error.message}`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  // Simulate AI response (mock response as fallback)
  const generateMockResponse = (userMessage) => {
    setIsLoading(true);

    setTimeout(() => {
      const responseIndex = Math.floor(Math.random() * aiResponses.length);
      let aiResponse = aiResponses[responseIndex];

      if (userMessage.toLowerCase().includes("event")) {
        aiResponse += " The AXIS'25 event showcases cutting-edge technology and quantum computing innovations.";
      } else if (userMessage.toLowerCase().includes("help")) {
        aiResponse += " I can provide information about the AXIS'25 event, speakers, schedule, or technology topics.";
      } else if (userMessage.toLowerCase().includes("quantum")) {
        aiResponse += " Quantum computing is a central theme of AXIS'25. Our Quantum Nexus features the latest advancements in the field.";
      } else {
        aiResponse += " Feel free to ask about any aspect of AXIS'25 or technology trends.";
      }

      const newMessage = {
        id: Date.now(),
        sender: "ai",
        text: aiResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, newMessage]);
      setIsLoading(false);
    }, 1500);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (userInput.trim() === "") return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      sender: "user",
      text: userInput,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);

    // Use OpenAI API if apiKey is provided, otherwise fall back to mock response
    if (apiKey) {
      callOpenAI(userMessage.text);
    } else {
      generateMockResponse(userMessage.text);
    }

    // Clear input
    setUserInput("");
  };

  // Handle chat toggle
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className={`ai-chat-wrapper ${isChatOpen ? "expanded" : "collapsed"}`}>
      {!isChatOpen ? (
        <div className="ai-chat-compact" onClick={toggleChat}>
          <span>Ask any Question</span>
        </div>
      ) : (
        <div className="ai-chat-container">
          <div className="ai-chat-header">
            <h2 className="ai-chat-title">QUANTUM NEXUS AI</h2>
            <p className="ai-chat-subtitle">AI-POWERED ASSISTANCE</p>
            <button className="ai-chat-close" onClick={toggleChat}>
              <FaTimes />
            </button>
          </div>

          <div className="ai-chat-panel">
            <div className="ai-chat-messages">
              {messages.map((message, index) => (
                <div
                  key={message.id}
                  className={`ai-chat-message ${message.sender === "user" ? "user-message" : "ai-message"}`}
                  style={{ animationDelay: `${Math.min(index * 100, 1000)}ms` }}
                >
                  <div className="message-content">
                    <p className="message-text">{message.text}</p>
                    <span className="message-time">{message.timestamp}</span>
                  </div>
                  <div className={`message-avatar ${message.sender === "user" ? "user-avatar" : "ai-avatar"}`}>
                    {message.sender === "user" ? "YOU" : "AI"}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="ai-typing">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="ai-chat-input-area">
              <form className="ai-chat-form" onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Ask the AI assistant..."
                  className="ai-chat-input"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  disabled={isLoading}
                />
                <button type="submit" className="ai-chat-button" disabled={isLoading}>
                  {isLoading ? "Processing..." : "Send"}
                </button>
              </form>
            </div>
          </div>

          <div className="ai-chat-footer">
            <p>Powered by AXIS'25 Quantum Neural Network</p>
            <p>Follow us for updates:</p>
            <div className="social-links">
              <a href="https://www.facebook.com/axisvnit" target="_blank" rel="noopener noreferrer">
                📌 Facebook
              </a>
              <a href="https://www.instagram.com/axis_vnit" target="_blank" rel="noopener noreferrer">
                📌 Instagram
              </a>
              <a href="https://www.linkedin.com/company/axis-vnit-nagpur" target="_blank" rel="noopener noreferrer">
                📌 LinkedIn
              </a>
              <a href="https://twitter.com/axisvnit" target="_blank" rel="noopener noreferrer">
                📌 X (Twitter)
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIChat;