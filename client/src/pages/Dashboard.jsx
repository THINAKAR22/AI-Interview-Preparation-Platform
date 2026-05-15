import logo from '../assets/logo.png';
import { useEffect, useState } from 'react';
import './Dashboard.css';
import SidebarLayout from '../components/sidenavbar';
import SearchBar from '../components/searchbar';
import TopNav from '../components/topnavbar';

function Dashboard({ navigate }) {
  const [stats, setStats] = useState({
    questionsSolved: 45,
    mockInterviews: 12,
    codingHours: 128,
    progress: 68,
    accuracyRate: 82,
    averageScore: 7.8,
  });

  const [recentActivity, setRecentActivity] = useState([
    { id: 1, type: 'Mock Interview', title: 'React & State Management', score: 8.5, date: '2 hours ago' },
    { id: 2, type: 'DSA Problem', title: 'Binary Tree Traversal', status: 'Solved', date: '1 day ago' },
    { id: 3, type: 'HR Round', title: 'Behavioral Questions', score: 9.0, date: '3 days ago' },
    { id: 4, type: 'Coding Challenge', title: 'LeetCode Hard', status: 'In Progress', date: '4 days ago' },
  ]);

  const [upcomingSessions, setUpcomingSessions] = useState([
    { id: 1, title: 'System Design Interview', date: 'May 20, 2026', time: '2:00 PM' },
    { id: 2, title: 'DSA Revision Session', date: 'May 18, 2026', time: '10:00 AM' },
    { id: 3, title: 'Mock Interview - Amazon', date: 'May 22, 2026', time: '4:00 PM' },
  ]);

  const renderProgressBar = (percentage) => {
    return (
      <div className="progress-bar-container">
        <div className="progress-bar-background">
          <div 
            className="progress-bar-fill" 
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <span className="progress-percentage">{percentage}%</span>
      </div>
    );
  };

  return (
    <>
      <TopNav />
      <SidebarLayout />
      <div className="dashboard-container">
        {/* Header */}
        <div className="dashboard-header">
          <h1>Welcome Back! 👋</h1>
          <p>Keep building your interview skills</p>
        </div>

        {/* Key Stats */}
        <div className="stats-grid">
          <div className="stat-card stat-card-1">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <h3>Questions Solved</h3>
              <p className="stat-value">{stats.questionsSolved}</p>
              <small className="stat-subtitle">+5 this week</small>
            </div>
          </div>

          <div className="stat-card stat-card-2">
            <div className="stat-icon">🎤</div>
            <div className="stat-content">
              <h3>Mock Interviews</h3>
              <p className="stat-value">{stats.mockInterviews}</p>
              <small className="stat-subtitle">Completed</small>
            </div>
          </div>

          <div className="stat-card stat-card-3">
            <div className="stat-icon">⏱️</div>
            <div className="stat-content">
              <h3>Learning Hours</h3>
              <p className="stat-value">{stats.codingHours}h</p>
              <small className="stat-subtitle">+12h this week</small>
            </div>
          </div>

          <div className="stat-card stat-card-4">
            <div className="stat-icon">⭐</div>
            <div className="stat-content">
              <h3>Avg Score</h3>
              <p className="stat-value">{stats.averageScore}/10</p>
              <small className="stat-subtitle">Excellent</small>
            </div>
          </div>
        </div>

        {/* Progress and Performance */}
        <div className="dashboard-grid">
          {/* Overall Progress */}
          <div className="card card-large">
            <div className="card-header">
              <h2>Overall Progress</h2>
              <span className="badge">On Track</span>
            </div>
            <div className="card-body">
              <div className="progress-section">
                <div className="progress-item">
                  <label>Interview Readiness</label>
                  {renderProgressBar(stats.progress)}
                </div>
                <div className="progress-item">
                  <label>DSA Mastery</label>
                  {renderProgressBar(72)}
                </div>
                <div className="progress-item">
                  <label>System Design</label>
                  {renderProgressBar(54)}
                </div>
                <div className="progress-item">
                  <label>HR Round Prep</label>
                  {renderProgressBar(88)}
                </div>
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="card card-side">
            <div className="card-header">
              <h2>Performance</h2>
            </div>
            <div className="card-body metrics-body">
              <div className="metric-item">
                <div className="metric-label">Accuracy Rate</div>
                <div className="metric-value">{stats.accuracyRate}%</div>
                <div className="metric-bar">
                  <div 
                    className="metric-bar-fill" 
                    style={{ width: `${stats.accuracyRate}%` }}
                  ></div>
                </div>
              </div>
              <div className="metric-item">
                <div className="metric-label">Speed Score</div>
                <div className="metric-value">76%</div>
                <div className="metric-bar">
                  <div 
                    className="metric-bar-fill" 
                    style={{ width: '76%' }}
                  ></div>
                </div>
              </div>
              <div className="metric-item">
                <div className="metric-label">Consistency</div>
                <div className="metric-value">84%</div>
                <div className="metric-bar">
                  <div 
                    className="metric-bar-fill" 
                    style={{ width: '84%' }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity & Upcoming Sessions */}
        <div className="dashboard-grid">
          {/* Recent Activity */}
          <div className="card card-large">
            <div className="card-header">
              <h2>Recent Activity</h2>
              <a href="#" className="view-all">View All</a>
            </div>
            <div className="card-body">
              <div className="activity-list">
                {recentActivity.map(activity => (
                  <div key={activity.id} className="activity-item">
                    <div className="activity-icon">
                      {activity.type === 'Mock Interview' && '🎤'}
                      {activity.type === 'DSA Problem' && '💻'}
                      {activity.type === 'HR Round' && '👔'}
                      {activity.type === 'Coding Challenge' && '⚡'}
                    </div>
                    <div className="activity-info">
                      <div className="activity-type">{activity.type}</div>
                      <div className="activity-title">{activity.title}</div>
                    </div>
                    <div className="activity-result">
                      {activity.score ? (
                        <span className="score-badge">Score: {activity.score}</span>
                      ) : (
                        <span className="status-badge">{activity.status}</span>
                      )}
                    </div>
                    <div className="activity-time">{activity.date}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Upcoming Sessions */}
          <div className="card card-side">
            <div className="card-header">
              <h2>Upcoming Sessions</h2>
            </div>
            <div className="card-body">
              <div className="sessions-list">
                {upcomingSessions.map(session => (
                  <div key={session.id} className="session-item">
                    <div className="session-content">
                      <div className="session-title">{session.title}</div>
                      <div className="session-info">
                        <span className="session-date">📅 {session.date}</span>
                        <span className="session-time">🕐 {session.time}</span>
                      </div>
                    </div>
                    <button className="btn-join">Join</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <button className="action-btn action-btn-primary">
            <span className="action-icon">🚀</span>
            Start Mock Interview
          </button>
          <button className="action-btn action-btn-secondary">
            <span className="action-icon">📚</span>
            Browse Questions
          </button>
          <button className="action-btn action-btn-secondary">
            <span className="action-icon">📖</span>
            Learn New Topics
          </button>
          <button className="action-btn action-btn-secondary">
            <span className="action-icon">📊</span>
            View Analytics
          </button>
        </div>
      </div>
    </>
  );
}

export default Dashboard;