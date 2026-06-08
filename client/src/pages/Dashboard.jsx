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
  FiBarChart3,
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

// Chart data
const weeklyProgressData = [
  { day: 'Mon', solved: 8, target: 10 },
  { day: 'Tue', solved: 12, target: 10 },
  { day: 'Wed', solved: 6, target: 10 },
  { day: 'Thu', solved: 14, target: 10 },
  { day: 'Fri', solved: 10, target: 10 },
  { day: 'Sat', solved: 15, target: 10 },
  { day: 'Sun', solved: 9, target: 10 },
];

const performanceData = [
  { topic: 'Arrays', solved: 28 },
  { topic: 'Strings', solved: 24 },
  { topic: 'Trees', solved: 19 },
  { topic: 'Graphs', solved: 15 },
  { topic: 'DP', solved: 12 },
];

const skillDistribution = [
  { name: 'DSA', value: 35, fill: '#6366f1' },
  { name: 'System Design', value: 25, fill: '#ec4899' },
  { name: 'JavaScript', value: 20, fill: '#f59e0b' },
  { name: 'Communication', value: 20, fill: '#10b981' },
];

const accuracyTrendData = [
  { week: 'Week 1', accuracy: 72 },
  { week: 'Week 2', accuracy: 76 },
  { week: 'Week 3', accuracy: 78 },
  { week: 'Week 4', accuracy: 82 },
  { week: 'Week 5', accuracy: 85 },
  { week: 'Week 6', accuracy: 88 },
];

function Dashboard() {
  const [stats] = useState({
    totalQuestions: 156,
    mockInterviews: 12,
    codingHours: 128,
    averageScore: 8.4,
    accuracyRate: 88,
  });

  const [activities] = useState([
    { id: 1, type: 'coding', title: 'Binary Tree Traversal', category: 'DSA', time: '2 hours ago', status: 'completed' },
    { id: 2, type: 'interview', title: 'React State Management', category: 'JavaScript', time: '1 day ago', status: 'completed' },
    { id: 3, type: 'system', title: 'Database Design', category: 'System Design', time: '2 days ago', status: 'completed' },
    { id: 4, type: 'practice', title: 'String Manipulation', category: 'DSA', time: '3 days ago', status: 'completed' },
  ]);

  const [sessions] = useState([
    { id: 1, title: 'System Design Interview', date: 'May 20, 2026', time: '2:00 PM', category: 'Interview' },
    { id: 2, title: 'DSA Revision Session', date: 'May 18, 2026', time: '10:00 AM', category: 'Study' },
    { id: 3, title: 'Mock Interview - Amazon', date: 'May 22, 2026', time: '4:00 PM', category: 'Interview' },
  ]);

  const StatCard = ({ icon: Icon, title, value, subtitle, gradient }) => (
    <div className="stat-card" style={{ background: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})` }}>
      <div className="stat-icon-wrapper">
        <Icon size={32} color="white" />
      </div>
      <div className="stat-content">
        <h3>{title}</h3>
        <p className="stat-value">{value}</p>
        <small className="stat-subtitle">{subtitle}</small>
      </div>
    </div>
  );

  const ActivityItem = ({ activity }) => (
    <div className="activity-item">
      <div className={`activity-type-badge activity-${activity.type}`}>
        {activity.type === 'coding' && <FiCode size={16} />}
        {activity.type === 'interview' && <FiMic size={16} />}
        {activity.type === 'system' && <FiDatabase size={16} />}
        {activity.type === 'practice' && <FiTarget size={16} />}
      </div>
      <div className="activity-info">
        <div className="activity-title">{activity.title}</div>
        <div className="activity-category">{activity.category}</div>
      </div>
      <div className="activity-time">{activity.time}</div>
    </div>
  );

  return (
    <>
      <TopNav />
      <SidebarLayout />
      <div className="dashboard-container">
        {/* Header */}
        <div className="dashboard-header">
          <div className="header-content">
            <h1>Dashboard</h1>
            <p>Track your interview preparation progress</p>
          </div>
          <button className="header-settings-btn">
            <FiSettings size={20} />
          </button>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          <StatCard
            icon={FiTarget}
            title="Questions Solved"
            value={stats.totalQuestions}
            subtitle="+15 this week"
            gradient={['#6366f1', '#818cf8']}
          />
          <StatCard
            icon={FiPlay}
            title="Mock Interviews"
            value={stats.mockInterviews}
            subtitle="Completed sessions"
            gradient={['#ec4899', '#f472b6']}
          />
          <StatCard
            icon={FiClock}
            title="Learning Hours"
            value={`${stats.codingHours}h`}
            subtitle="+8h this week"
            gradient={['#f59e0b', '#fbbf24']}
          />
          <StatCard
            icon={FiStar}
            title="Avg Score"
            value={`${stats.averageScore}/10`}
            subtitle="Excellent progress"
            gradient={['#10b981', '#34d399']}
          />
        </div>

        {/* Charts Grid */}
        <div className="charts-grid">
          {/* Weekly Progress Chart */}
          <div className="chart-card">
            <div className="chart-header">
              <h3>Weekly Progress</h3>
              <span className="chart-subtitle">Questions Solved</span>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyProgressData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="day" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    background: '#ffffff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="solved" fill="#6366f1" radius={[8, 8, 0, 0]} />
                <Bar dataKey="target" fill="#e5e7eb" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Topic Performance Chart */}
          <div className="chart-card">
            <div className="chart-header">
              <h3>Topic Performance</h3>
              <span className="chart-subtitle">Questions per topic</span>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={performanceData}
                layout="vertical"
                margin={{ left: 100 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis type="number" stroke="#9ca3af" />
                <YAxis dataKey="topic" type="category" stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    background: '#ffffff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="solved" fill="#ec4899" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Secondary Charts Grid */}
        <div className="charts-grid">
          {/* Accuracy Trend */}
          <div className="chart-card">
            <div className="chart-header">
              <h3>Accuracy Trend</h3>
              <span className="chart-subtitle">Last 6 weeks</span>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={accuracyTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="week" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    background: '#ffffff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="accuracy"
                  fill="#f59e0b"
                  stroke="#f59e0b"
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Skill Distribution */}
          <div className="chart-card">
            <div className="chart-header">
              <h3>Skill Distribution</h3>
              <span className="chart-subtitle">Time allocation</span>
            </div>
            <div className="pie-chart-wrapper">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={skillDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name} ${value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {skillDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="content-grid">
          {/* Recent Activity */}
          <div className="content-card">
            <div className="card-header">
              <h3>Recent Activity</h3>
              <a href="#" className="view-all">View All</a>
            </div>
            <div className="card-body">
              <div className="activity-list">
                {activities.map(activity => (
                  <ActivityItem key={activity.id} activity={activity} />
                ))}
              </div>
            </div>
          </div>

          {/* Upcoming Sessions */}
          <div className="content-card">
            <div className="card-header">
              <h3>Upcoming Sessions</h3>
              <a href="#" className="view-all">View All</a>
            </div>
            <div className="card-body">
              <div className="sessions-list">
                {sessions.map(session => (
                  <div key={session.id} className="session-item">
                    <div className="session-info">
                      <div className="session-title">{session.title}</div>
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
                    <span className={`session-badge session-${session.category.toLowerCase()}`}>
                      {session.category}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions-section">
          <h3 className="section-title">Quick Actions</h3>
          <div className="quick-actions">
            <button className="action-btn action-btn-primary">
              <FiPlay size={18} />
              Start Mock Interview
            </button>
            <button className="action-btn action-btn-secondary">
              <FiBook size={18} />
              Browse Questions
            </button>
            <button className="action-btn action-btn-secondary">
              <FiBarChart3 size={18} />
              View Analytics
            </button>
            <button className="action-btn action-btn-secondary">
              <FiZap size={18} />
              Practice Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// Icon imports for activity types
import { FiCode, FiMic, FiDatabase } from 'react-icons/fi';

export default Dashboard;