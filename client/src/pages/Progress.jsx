import React, { useState, useEffect } from 'react';
import './Progress.css'; // You'll need to create this CSS file

const Progress = () => {
  const [progressData, setProgressData] = useState({
    codingArena: {
      problemsSolved: 0,
      totalProblems: 50,
      streak: 0,
      languages: ['JavaScript', 'Python', 'Java']
    },
    mockInterviews: {
      completed: 0,
      total: 20,
      averageScore: 0,
      topics: ['Data Structures', 'Algorithms', 'System Design']
    },
    resumeAnalysis: {
      analyzed: false,
      score: 0,
      improvements: []
    },
    overallProgress: 0
  });

  const [recentActivity, setRecentActivity] = useState([
    { id: 1, type: 'coding', description: 'Solved "Two Sum" problem', date: '2026-06-24' },
    { id: 2, type: 'mock', description: 'Completed Mock Interview #5', date: '2026-06-23' },
    { id: 3, type: 'resume', description: 'Resume analyzed for ATS compatibility', date: '2026-06-22' }
  ]);

  // Simulate fetching progress data
  useEffect(() => {
    // In a real app, you would fetch from your backend
    const fetchProgressData = async () => {
      // Simulating API call
      const mockData = {
        codingArena: {
          problemsSolved: 32,
          totalProblems: 50,
          streak: 7,
          languages: ['JavaScript', 'Python', 'Java']
        },
        mockInterviews: {
          completed: 12,
          total: 20,
          averageScore: 78,
          topics: ['Data Structures', 'Algorithms', 'System Design', 'Database']
        },
        resumeAnalysis: {
          analyzed: true,
          score: 85,
          improvements: ['Add more quantifiable achievements', 'Improve ATS keywords', 'Shorten summary']
        },
        overallProgress: 65
      };
      setProgressData(mockData);
    };

    fetchProgressData();
  }, []);

  const calculateProgress = (solved, total) => {
    return total > 0 ? Math.round((solved / total) * 100) : 0;
  };

  const getProgressBarColor = (percentage) => {
    if (percentage >= 80) return 'progress-bar-high';
    if (percentage >= 50) return 'progress-bar-medium';
    return 'progress-bar-low';
  };

  return (
    <div className="progress-page">
      <div className="progress-header">
        <h1>Your Progress Dashboard</h1>
        <div className="overall-progress">
          <div className="overall-stats">
            <div className="stat-item">
              <h3>Overall Progress</h3>
              <div className="circular-progress">
                <svg viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" className="circle-bg" />
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="40" 
                    className="circle-fill" 
                    strokeDasharray={`${(progressData.overallProgress / 100) * 251.2} 251.2`}
                    strokeDashoffset="0"
                  />
                  <text x="50" y="50" className="progress-text">{progressData.overallProgress}%</text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="progress-grid">
        {/* Coding Arena Progress */}
        <div className="progress-card">
          <div className="card-header">
            <h2>💻 Coding Arena</h2>
            <span className="streak-badge">🔥 {progressData.codingArena.streak} day streak</span>
          </div>
          <div className="card-content">
            <div className="progress-stats">
              <div className="stat">
                <span className="stat-label">Problems Solved</span>
                <span className="stat-value">{progressData.codingArena.problemsSolved}/{progressData.codingArena.totalProblems}</span>
              </div>
              <div className="progress-bar-container">
                <div 
                  className={`progress-bar ${getProgressBarColor(calculateProgress(progressData.codingArena.problemsSolved, progressData.codingArena.totalProblems))}`}
                  style={{ width: `${calculateProgress(progressData.codingArena.problemsSolved, progressData.codingArena.totalProblems)}%` }}
                ></div>
              </div>
              <span className="progress-percentage">{calculateProgress(progressData.codingArena.problemsSolved, progressData.codingArena.totalProblems)}%</span>
            </div>
            <div className="languages-section">
              <h4>Languages Practiced:</h4>
              <div className="language-tags">
                {progressData.codingArena.languages.map((lang, index) => (
                  <span key={index} className="language-tag">{lang}</span>
                ))}
              </div>
            </div>
            <button className="action-button">Continue Coding</button>
          </div>
        </div>

        {/* Mock Interview Progress */}
        <div className="progress-card">
          <div className="card-header">
            <h2>🎤 Mock Interviews</h2>
          </div>
          <div className="card-content">
            <div className="progress-stats">
              <div className="stat">
                <span className="stat-label">Completed</span>
                <span className="stat-value">{progressData.mockInterviews.completed}/{progressData.mockInterviews.total}</span>
              </div>
              <div className="progress-bar-container">
                <div 
                  className={`progress-bar ${getProgressBarColor(calculateProgress(progressData.mockInterviews.completed, progressData.mockInterviews.total))}`}
                  style={{ width: `${calculateProgress(progressData.mockInterviews.completed, progressData.mockInterviews.total)}%` }}
                ></div>
              </div>
              <span className="progress-percentage">{calculateProgress(progressData.mockInterviews.completed, progressData.mockInterviews.total)}%</span>
            </div>
            <div className="score-section">
              <div className="score-item">
                <span className="score-label">Average Score</span>
                <span className="score-value">{progressData.mockInterviews.averageScore}%</span>
              </div>
            </div>
            <div className="topics-section">
              <h4>Topics Covered:</h4>
              <div className="topic-tags">
                {progressData.mockInterviews.topics.map((topic, index) => (
                  <span key={index} className="topic-tag">{topic}</span>
                ))}
              </div>
            </div>
            <button className="action-button">Start New Interview</button>
          </div>
        </div>

        {/* Resume Analysis */}
        <div className="progress-card">
          <div className="card-header">
            <h2>📄 Resume Analysis</h2>
          </div>
          <div className="card-content">
            {progressData.resumeAnalysis.analyzed ? (
              <>
                <div className="score-section">
                  <div className="score-item">
                    <span className="score-label">ATS Score</span>
                    <span className="score-value">{progressData.resumeAnalysis.score}%</span>
                  </div>
                </div>
                <div className="improvements-section">
                  <h4>Suggested Improvements:</h4>
                  <ul className="improvements-list">
                    {progressData.resumeAnalysis.improvements.map((item, index) => (
                      <li key={index} className="improvement-item">{item}</li>
                    ))}
                  </ul>
                </div>
              </>
            ) : (
              <div className="not-analyzed">
                <p>Your resume hasn't been analyzed yet.</p>
                <p className="hint">Upload your resume for an instant analysis!</p>
              </div>
            )}
            <button className="action-button">
              {progressData.resumeAnalysis.analyzed ? 'Re-analyze Resume' : 'Analyze Resume'}
            </button>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="recent-activity">
        <div className="activity-header">
          <h2>Recent Activity</h2>
        </div>
        <div className="activity-timeline">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="activity-item">
              <div className="activity-icon">
                {activity.type === 'coding' && '💻'}
                {activity.type === 'mock' && '🎤'}
                {activity.type === 'resume' && '📄'}
              </div>
              <div className="activity-details">
                <p className="activity-description">{activity.description}</p>
                <span className="activity-date">{activity.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements Section */}
      <div className="achievements-section">
        <h2>🏆 Achievements</h2>
        <div className="achievements-grid">
          <div className="achievement-card">
            <div className="achievement-icon">⭐</div>
            <div className="achievement-name">First Problem Solved</div>
            <div className="achievement-status unlocked">Unlocked</div>
          </div>
          <div className="achievement-card">
            <div className="achievement-icon">🚀</div>
            <div className="achievement-name">10 Problems Solved</div>
            <div className="achievement-status unlocked">Unlocked</div>
          </div>
          <div className="achievement-card">
            <div className="achievement-icon">💪</div>
            <div className="achievement-name">50 Problems Solved</div>
            <div className="achievement-status locked">Locked</div>
          </div>
          <div className="achievement-card">
            <div className="achievement-icon">🎯</div>
            <div className="achievement-name">Mock Interview Master</div>
            <div className="achievement-status locked">Locked</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;