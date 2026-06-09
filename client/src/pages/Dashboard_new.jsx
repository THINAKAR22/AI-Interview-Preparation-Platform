import { useState } from 'react';
import './Dashboard.css';
import SidebarLayout from '../components/sidenavbar';
import TopNav from '../components/topnavbar';

// Icons from react-icons
import {
  FiTrendingUp,
  FiTarget,
  FiClock,
  FiStar,
  FiArrowRight,
  FiPlay,
  FiBook,
  FiBarChart2,
  FiZap,
  FiCheck,
  FiCalendar,
  FiSettings,
  FiBell,
} from 'react-icons/fi';

// Charts from recharts
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';

function Dashboard() {
  // Chart data
  const weeklyProgressData = [
    { day: 'Mon', completed: 65, target: 100 },
    { day: 'Tue', completed: 78, target: 100 },
    { day: 'Wed', completed: 90, target: 100 },
    { day: 'Thu', completed: 81, target: 100 },
    { day: 'Fri', completed: 92, target: 100 },
    { day: 'Sat', completed: 88, target: 100 },
    { day: 'Sun', completed: 75, target: 100 },
  ];

  const performanceData = [
    { topic: 'DSA', score: 78 },
    { topic: 'System Design', score: 65 },
    { topic: 'SQL', score: 85 },
    { topic: 'HR Round', score: 92 },
    { topic: 'Behavioral', score: 88 },
  ];

  const skillDistribution = [
    { name: 'Expert', value: 8 },
    { name: 'Proficient', value: 15 },
    { name: 'Intermediate', value: 22 },
    { name: 'Beginner', value: 12 },
  ];

  const accuracyTrendData = [
    { week: 'W1', accuracy: 72 },
    { week: 'W2', accuracy: 75 },
    { week: 'W3', accuracy: 79 },
    { week: 'W4', accuracy: 82 },
  ];

  const colors = ['#6366f1', '#ec4899', '#f59e0b', '#10b981'];

  const [stats] = useState({
    questionsSolved: 245,
    mockInterviews: 18,
    studyHours: 156,
    averageScore: 8.2,
    accuracyRate: 82,
  });

  const [recentActivity] = useState([
    {
      id: 1,
      type: 'interview',
      title: 'System Design - Netflix',
      time: '2 hours ago',
      score: 8.5,
    },
    {
      id: 2,
      type: 'problem',
      title: 'Binary Tree Level Order Traversal',
      time: '1 day ago',
      status: 'solved',
    },
    {
      id: 3,
      type: 'hr',
      title: 'Behavioral Questions Round',
      time: '3 days ago',
      score: 9.0,
    },
    {
      id: 4,
      type: 'challenge',
      title: 'LeetCode Hard - String Processing',
      time: '4 days ago',
      status: 'in-progress',
    },
  ]);

  const [upcomingSessions] = useState([
    { id: 1, title: 'DSA Revision', date: 'Today', time: '3:00 PM', category: 'DSA' },
    { id: 2, title: 'Mock Interview', date: 'May 17', time: '2:00 PM', category: 'Interview' },
    { id: 3, title: 'System Design Deep Dive', date: 'May 18', time: '4:00 PM', category: 'Design' },
  ]);

  const StatCard = ({ icon: Icon, label, value, subtitle, trend, color }) => (
    <div className={`stat-card stat-card-${color}`}>
      <div className="stat-card-content">
        <div className="stat-card-header">
          <div className={`stat-icon stat-icon-${color}`}>
            <Icon size={24} />
          </div>
          {trend && (
            <div className="stat-trend">
              <FiTrendingUp size={16} />
              <span>{trend}</span>
            </div>
          )}
        </div>
        <p className="stat-label">{label}</p>
        <p className="stat-value">{value}</p>
        {subtitle && <p className="stat-subtitle">{subtitle}</p>}
      </div>
    </div>
  );

  const ActivityItem = ({ item }) => {
    const getActivityIcon = (type) => {
      switch (type) {
        case 'interview':
          return <FiTarget size={18} />;
        case 'problem':
          return <FiZap size={18} />;
        case 'hr':
          return <FiBell size={18} />;
        case 'challenge':
          return <FiCheck size={18} />;
        default:
          return <FiArrowRight size={18} />;
      }
    };

    return (
      <div className="activity-item">
        <div className={`activity-icon activity-${item.type}`}>{getActivityIcon(item.type)}</div>
        <div className="activity-content">
          <p className="activity-title">{item.title}</p>
          <p className="activity-time">{item.time}</p>
        </div>
        <div className="activity-badge">
          {item.score ? (
            <span className="badge-score">{item.score}</span>
          ) : (
            <span className={`badge-status badge-${item.status}`}>
              {item.status === 'solved' ? 'Solved' : 'In Progress'}
            </span>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <TopNav />
      <SidebarLayout />
      <main className="dashboard-main">
        {/* Header */}
        <div className="dashboard-header-section">
          <div className="header-content">
            <h1 className="header-title">Welcome back, Learner! 👋</h1>
            <p className="header-subtitle">Track your interview preparation journey</p>
          </div>
          <button className="header-action">
            <FiSettings size={20} />
            Settings
          </button>
        </div>

        {/* Stats Grid */}
        <div className="stats-container">
          <StatCard
            icon={FiTarget}
            label="Questions Solved"
            value={stats.questionsSolved}
            subtitle="+24 this week"
            trend="+14%"
            color="primary"
          />
          <StatCard
            icon={FiClock}
            label="Study Hours"
            value={`${stats.studyHours}h`}
            subtitle="+18h this week"
            trend="+22%"
            color="secondary"
          />
          <StatCard
            icon={FiBell}
            label="Mock Interviews"
            value={stats.mockInterviews}
            subtitle="2 scheduled"
            trend="+3"
            color="warning"
          />
          <StatCard
            icon={FiStar}
            label="Avg Score"
            value={stats.averageScore}
            subtitle="Out of 10"
            color="success"
          />
        </div>

        {/* Main Charts Grid */}
        <div className="charts-grid">
          {/* Weekly Progress Chart */}
          <div className="chart-card">
            <div className="chart-header">
              <h3>Weekly Progress</h3>
              <span className="chart-meta">Last 7 days</span>
            </div>
            <div className="chart-body">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={weeklyProgressData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                  <XAxis dataKey="day" stroke="#6b7280" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    }}
                  />
                  <Bar dataKey="completed" fill="#6366f1" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="target" fill="#e5e7eb" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Topic Performance */}
          <div className="chart-card">
            <div className="chart-header">
              <h3>Performance by Topic</h3>
              <span className="chart-meta">Current scores</span>
            </div>
            <div className="chart-body">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart
                  data={performanceData}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 150, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis type="number" stroke="#6b7280" />
                  <YAxis dataKey="topic" type="category" width={140} stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="score" fill="#ec4899" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Secondary Charts Row */}
        <div className="charts-grid">
          {/* Accuracy Trend */}
          <div className="chart-card">
            <div className="chart-header">
              <h3>Accuracy Trend</h3>
              <span className="chart-meta">+3% this month</span>
            </div>
            <div className="chart-body">
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={accuracyTrendData}>
                  <defs>
                    <linearGradient id="colorAccuracy" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                  <XAxis dataKey="week" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="accuracy"
                    stroke="#10b981"
                    fillOpacity={1}
                    fill="url(#colorAccuracy)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Skill Distribution */}
          <div className="chart-card">
            <div className="chart-header">
              <h3>Skill Distribution</h3>
              <span className="chart-meta">Total: 57 topics</span>
            </div>
            <div className="chart-body flex-center">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={skillDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {skillDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colors[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="chart-legend">
                {skillDistribution.map((item, idx) => (
                  <div key={idx} className="legend-item">
                    <span className="legend-color" style={{ backgroundColor: colors[idx] }}></span>
                    <span className="legend-label">
                      {item.name} ({item.value})
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="content-grid">
          {/* Recent Activity */}
          <div className="card card-large">
            <div className="card-header">
              <h3>Recent Activity</h3>
              <a href="#" className="link-view-all">
                View All <FiArrowRight size={16} />
              </a>
            </div>
            <div className="card-body">
              <div className="activity-list">
                {recentActivity.map((item) => (
                  <ActivityItem key={item.id} item={item} />
                ))}
              </div>
            </div>
          </div>

          {/* Upcoming Sessions */}
          <div className="card">
            <div className="card-header">
              <h3>Upcoming Sessions</h3>
            </div>
            <div className="card-body">
              <div className="sessions-list">
                {upcomingSessions.map((session) => (
                  <div key={session.id} className="session-card">
                    <div className="session-info">
                      <h4>{session.title}</h4>
                      <div className="session-meta">
                        <span className="session-date">
                          <FiCalendar size={14} />
                          {session.date}
                        </span>
                        <span className="session-time">
                          <FiClock size={14} />
                          {session.time}
                        </span>
                      </div>
                    </div>
                    <span className={`session-category category-${session.category.toLowerCase()}`}>
                      {session.category}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <button className="action-button action-primary">
            <FiPlay size={18} />
            Start Interview
          </button>
          <button className="action-button action-secondary">
            <FiBook size={18} />
            Browse Topics
          </button>
          <button className="action-button action-secondary">
            <FiBarChart2 size={18} />
            View Analytics
          </button>
          <button className="action-button action-secondary">
            <FiZap size={18} />
            Daily Challenge
          </button>
        </div>
      </main>
    </>
  );
}

export default Dashboard;
