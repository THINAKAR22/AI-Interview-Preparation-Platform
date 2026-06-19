import './Dashboard.css';
import SidebarLayout from '../components/sidenavbar';
import TopNav from '../components/topnavbar';
import heroArt from '../assets/hero.png';

import {
  FiArrowRight,
  FiBarChart2,
  FiBriefcase,
  FiClock,
  FiCode,
  FiCpu,
  FiDatabase,
  FiHeadphones,
  FiLayers,
  FiPlay,
  FiSearch,
  FiTarget,
  FiTrendingUp,
  FiUsers,
} from 'react-icons/fi';

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const scoreTrend = [
  { day: 'Sun', score: 78 },
  { day: 'Mon', score: 80 },
  { day: 'Tue', score: 81 },
  { day: 'Wed', score: 81 },
  { day: 'Thu', score: 84 },
  { day: 'Fri', score: 83 },
  { day: 'Sat', score: 86 },
];

const metrics = [
  {
    icon: FiHeadphones,
    label: 'Interviews Taken',
    value: '14/20',
  },
  {
    icon: FiBarChart2,
    label: 'AI Score',
    value: '92%',
    featured: true,
    meta: 'Performance',
  },
  {
    icon: FiClock,
    label: 'Practice Hours',
    value: '28 hrs',
  },
  {
    icon: FiTarget,
    label: 'Companies Prepared',
    value: '6',
  },
];

const interviews = [
  { company: 'Google Tech', detail: 'Upcoming Mock 1' },
  { company: 'Amazon Behavioral', detail: 'Upcoming Mock 2' },
];

const modules = [
  { icon: FiLayers, title: 'Data Structures', progress: 68 },
  { icon: FiCpu, title: 'System Design', progress: 78 },
  { icon: FiUsers, title: 'Behavioral Qs', progress: 72 },
  { icon: FiCode, title: 'Coding Round', progress: 58 },
  { icon: FiDatabase, title: 'Database Design', progress: 64 },
  { icon: FiBriefcase, title: 'Resume Review', progress: 82 },
];

function Dashboard() {
  return (
    <>
      <main className="dashboard-main dashboard-dark">
        <section className="dashboard-toolbar" aria-label="Dashboard tools">
          <label className="dashboard-search">
            <FiSearch size={20} />
            <input type="search" placeholder="Search" />
          </label>
          <button className="start-interview-btn">
            <FiPlay size={18} />
            Start Interview
          </button>
        </section>

        <section className="dashboard-hero">
          <div className="hero-copy">
            <h1>Ace Your Dream Interview</h1>
            <p>Practice AI-powered mock interviews with instant feedback.</p>
            <button className="hero-action">
              Start a New Mock Interview
              <FiArrowRight size={18} />
            </button>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <div className="interview-illustration">
              <div className="candidate-avatar" />
              <div className="ai-card">
                <img src={heroArt} alt="" />
                <span>AI</span>
              </div>
              <div className="chat-bubble chat-bubble-one" />
              <div className="chat-bubble chat-bubble-two" />
            </div>
          </div>
        </section>

        <section className="metric-grid" aria-label="Interview statistics">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <article
                className={`metric-card${metric.featured ? ' metric-card-featured' : ''}`}
                key={metric.label}
              >
                <span className="metric-icon">
                  <Icon size={22} />
                </span>
                <div>
                  <p>{metric.label}</p>
                  <strong>{metric.value}</strong>
                </div>
                {metric.meta && <span className="metric-meta">{metric.meta}</span>}
              </article>
            );
          })}
        </section>

        <section className="dashboard-split">
          <article className="analytics-panel">
            <div className="panel-header">
              <h2>Performance Analytics</h2>
              <button className="panel-filter">
                AI Score Trend
                <FiTrendingUp size={15} />
              </button>
            </div>
            <div className="analytics-chart">
              <ResponsiveContainer width="100%" height={180}>
                <AreaChart data={scoreTrend} margin={{ top: 14, right: 12, left: -18, bottom: 0 }}>
                  <defs>
                    <linearGradient id="scoreFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#7c5cff" stopOpacity={0.75} />
                      <stop offset="95%" stopColor="#7c5cff" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#34343a" strokeDasharray="0" vertical={false} />
                  <XAxis dataKey="day" stroke="#a8a8ad" tickLine={false} axisLine={false} />
                  <YAxis stroke="#a8a8ad" tickLine={false} axisLine={false} domain={[76, 92]} />
                  <Tooltip
                    cursor={{ stroke: '#7c5cff', strokeWidth: 1 }}
                    contentStyle={{
                      background: '#2a2a30',
                      border: '1px solid #3f3f48',
                      borderRadius: 8,
                      color: '#fff',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke="#7c5cff"
                    strokeWidth={3}
                    fill="url(#scoreFill)"
                    activeDot={{ r: 5, fill: '#ffffff', stroke: '#7c5cff', strokeWidth: 3 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </article>

          <article className="upcoming-panel">
            <div className="panel-header">
              <h2>Upcoming Interviews</h2>
            </div>
            <div className="interview-list">
              {interviews.map((interview) => (
                <div className="interview-row" key={interview.company}>
                  <div>
                    <strong>{interview.company}</strong>
                    <span>{interview.detail}</span>
                  </div>
                  <button>Interview Link</button>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="modules-section">
          <h2>Featured Practice Modules</h2>
          <div className="modules-grid">
            {modules.map((module) => {
              const Icon = module.icon;
              return (
                <article className="module-card" key={module.title}>
                  <span className="module-icon">
                    <Icon size={22} />
                  </span>
                  <div className="module-content">
                    <h3>{module.title}</h3>
                    <div className="progress-track">
                      <span style={{ width: `${module.progress}%` }} />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </main>
    </>
  );
}

export default Dashboard;
