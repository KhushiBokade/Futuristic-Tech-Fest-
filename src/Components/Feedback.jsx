import React, { useState, useEffect } from 'react';
import './Feedback.css'; // Import the separate CSS file

const Feedback = () => {
  // Sample feedback data
  const [feedbacks, setFeedbacks] = useState([
    { id: 1, user: 'John', message: 'Great Competition..!', timestamp: '10:30 AM' },
    { id: 2, user: 'Sarah', message: 'Interesting Games', timestamp: '11:45 AM' },
    { id: 3, user: 'Michael', message: 'Levels are tough', timestamp: '2:15 PM' },
  ]);

  // New feedback state
  const [newFeedback, setNewFeedback] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [username, setUsername] = useState('You');

  // Animation for new feedback entries
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Trigger animation when component mounts
    setAnimate(true);
  }, []);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newFeedback.trim() === '') return;

    // Create new feedback object
    const currentTime = new Date();
    const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const newFeedbackObj = {
      id: Date.now(),
      user: username,
      message: newFeedback,
      timestamp: formattedTime
    };

    // Add new feedback to the list
    setFeedbacks([...feedbacks, newFeedbackObj]);
    
    // Clear input
    setNewFeedback('');
    
    // Scroll to the bottom after adding new feedback
    setTimeout(() => {
      const messagesContainer = document.querySelector('.feedback-messages');
      if (messagesContainer) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }
    }, 100);
  };

  return (
    <div className="feedback-container">
      <h2 className="feedback-title">Feedback</h2>
      
      <div className="feedback-panel">
        <div className="feedback-messages">
          {feedbacks.map((feedback, index) => (
            <div 
              key={feedback.id}
              className={`feedback-message ${animate ? 'animate' : ''} ${feedback.user === username ? 'user-message' : ''}`}
              style={{ transitionDelay: `${Math.min(index * 150, 1000)}ms` }}
            >
              <div className="feedback-header">
                <span className="feedback-user">{feedback.user}</span>
                <span className="feedback-time">{feedback.timestamp}</span>
              </div>
              <p className="feedback-text">{feedback.message}</p>
            </div>
          ))}
        </div>
        
        <div className="feedback-input-area">
          <form className="feedback-form" onSubmit={handleSubmit}>
            <input 
              type="text" 
              placeholder="Add your feedback..." 
              className="feedback-input"
              value={newFeedback}
              onChange={(e) => setNewFeedback(e.target.value)}
            />
            <button 
              type="submit" 
              className="feedback-button"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Feedback;