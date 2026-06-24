import React, { useState, useEffect } from 'react';
import './MockInterview.css';
import { FaMicrophone, FaStop, FaVideo, FaRegClock, FaLightbulb, FaArrowRight, FaArrowLeft } from 'react-icons/fa';

const MockInterview = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Technical');

  // Sample interview questions based on category
  const questions = {
    Technical: [
      {
        id: 1,
        question: "Explain the difference between let, const, and var in JavaScript.",
        difficulty: "Medium",
        category: "JavaScript",
        expectedTime: "2 min",
        tips: "Focus on scope, hoisting, and reassignment capabilities."
      },
      {
        id: 2,
        question: "How does React's virtual DOM work and why is it important?",
        difficulty: "Hard",
        category: "React",
        expectedTime: "3 min",
        tips: "Explain the reconciliation process and performance benefits."
      },
      {
        id: 3,
        question: "What are closures in JavaScript and how do they work?",
        difficulty: "Medium",
        category: "JavaScript",
        expectedTime: "2 min",
        tips: "Provide examples of closure usage in real applications."
      },
      {
        id: 4,
        question: "Explain the concept of state management in React applications.",
        difficulty: "Medium",
        category: "React",
        expectedTime: "3 min",
        tips: "Discuss different state management approaches."
      }
    ],
    'HR Questions': [
      {
        id: 1,
        question: "Tell me about yourself and your background.",
        difficulty: "Easy",
        category: "General",
        expectedTime: "2 min",
        tips: "Keep it professional and highlight relevant experiences."
      },
      {
        id: 2,
        question: "Where do you see yourself in 5 years?",
        difficulty: "Medium",
        category: "Career Goals",
        expectedTime: "2 min",
        tips: "Show ambition but be realistic about your career path."
      },
      {
        id: 3,
        question: "How do you handle conflicts in a team environment?",
        difficulty: "Medium",
        category: "Teamwork",
        expectedTime: "2 min",
        tips: "Provide specific examples of conflict resolution."
      }
    ],
    'DSA': [
      {
        id: 1,
        question: "Implement a function to find the longest palindromic substring.",
        difficulty: "Hard",
        category: "Algorithms",
        expectedTime: "5 min",
        tips: "Consider using dynamic programming approach."
      },
      {
        id: 2,
        question: "Explain the time complexity of various sorting algorithms.",
        difficulty: "Medium",
        category: "Algorithms",
        expectedTime: "3 min",
        tips: "Compare different sorting algorithms and their use cases."
      }
    ]
  };

  const currentQuestions = questions[selectedCategory] || questions.Technical;
  const currentQ = currentQuestions[currentQuestion];

  useEffect(() => {
    let interval;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    setIsTimerRunning(true);
    // Here you would integrate with WebRTC/MediaRecorder API
    console.log('Started recording');
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setIsTimerRunning(false);
    // Here you would stop recording and save the audio/video
    console.log('Stopped recording');
    setShowFeedback(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < currentQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setTimer(0);
      setIsTimerRunning(false);
      setShowFeedback(false);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      setTimer(0);
      setIsTimerRunning(false);
      setShowFeedback(false);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentQuestion(0);
    setTimer(0);
    setIsTimerRunning(false);
    setShowFeedback(false);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return '#4CAF50';
      case 'Medium':
        return '#FFA726';
      case 'Hard':
        return '#EF5350';
      default:
        return '#757575';
    }
  };

  return (
    <div className="mock-interview-container">
      <div className="mock-interview-header">
        <h1>Mock Interview</h1>
        <div className="interview-controls">
          <button 
            className={`video-toggle ${isVideoOn ? 'active' : ''}`}
            onClick={() => setIsVideoOn(!isVideoOn)}
          >
            <FaVideo />
          </button>
          <div className="timer-display">
            <FaRegClock />
            <span>{formatTime(timer)}</span>
          </div>
        </div>
      </div>

      <div className="interview-main-content">
        {/* Left Panel - Question Area */}
        <div className="question-panel">
          <div className="category-selector">
            {Object.keys(questions).map(category => (
              <button
                key={category}
                className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="question-card">
            <div className="question-header">
              <span className="question-number">
                Question {currentQuestion + 1} of {currentQuestions.length}
              </span>
              <span 
                className="difficulty-badge"
                style={{ backgroundColor: getDifficultyColor(currentQ?.difficulty) }}
              >
                {currentQ?.difficulty}
              </span>
            </div>

            <div className="question-content">
              <h3>{currentQ?.question}</h3>
              <div className="question-meta">
                <span className="category-tag">{currentQ?.category}</span>
                <span className="time-tag">⏱️ {currentQ?.expectedTime}</span>
              </div>
            </div>

            <div className="question-tips">
              <FaLightbulb className="tips-icon" />
              <p><strong>Tips:</strong> {currentQ?.tips}</p>
            </div>

            <div className="navigation-buttons">
              <button 
                className="nav-btn prev" 
                onClick={handlePreviousQuestion}
                disabled={currentQuestion === 0}
              >
                <FaArrowLeft /> Previous
              </button>
              <button 
                className="nav-btn next" 
                onClick={handleNextQuestion}
                disabled={currentQuestion === currentQuestions.length - 1}
              >
                Next <FaArrowRight />
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel - Recording/Video Area */}
        <div className="recording-panel">
          <div className="video-container">
            <div className={`video-feed ${isVideoOn ? '' : 'video-off'}`}>
              {isVideoOn ? (
                <div className="video-placeholder">
                  <FaVideo className="video-icon" />
                  <p>Camera Feed</p>
                </div>
              ) : (
                <div className="video-off-placeholder">
                  <p>Camera Off</p>
                </div>
              )}
              {isRecording && (
                <div className="recording-indicator">
                  <span className="recording-dot"></span>
                  Recording...
                </div>
              )}
            </div>

            <div className="recording-controls">
              {!isRecording ? (
                <button className="start-record-btn" onClick={handleStartRecording}>
                  <FaMicrophone /> Start Recording
                </button>
              ) : (
                <button className="stop-record-btn" onClick={handleStopRecording}>
                  <FaStop /> Stop Recording
                </button>
              )}
            </div>
          </div>

          {/* Feedback Section */}
          {showFeedback && (
            <div className="feedback-section">
              <h4>AI Feedback</h4>
              <div className="feedback-content">
                <div className="feedback-item">
                  <span className="feedback-label">Clarity:</span>
                  <div className="feedback-bar">
                    <div className="feedback-progress" style={{ width: '75%' }}></div>
                  </div>
                </div>
                <div className="feedback-item">
                  <span className="feedback-label">Confidence:</span>
                  <div className="feedback-bar">
                    <div className="feedback-progress" style={{ width: '60%' }}></div>
                  </div>
                </div>
                <div className="feedback-item">
                  <span className="feedback-label">Relevance:</span>
                  <div className="feedback-bar">
                    <div className="feedback-progress" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div className="feedback-text">
                  <p>Good explanation, but consider providing more specific examples to strengthen your answer.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MockInterview;