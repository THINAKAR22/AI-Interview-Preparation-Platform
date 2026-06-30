import './Dashboard.css';

import {
  FiTrendingUp, FiTarget, FiClock, FiStar,
  FiArrowRight, FiPlay, FiBook, FiBarChart2,
  FiZap, FiCalendar, FiCheck, FiMic,
} from 'react-icons/fi';

import {
  BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, AreaChart, Area, Legend,
} from 'recharts';

/* ─── Data ─────────────────────────────────────────────────── */
const weeklyData = [
  { day: 'Mon', solved: 12, target: 18 },
  { day: 'Tue', solved: 18, target: 18 },
  { day: 'Wed', solved: 15, target: 18 },
  { day: 'Thu', solved: 20, target: 18 },
  { day: 'Fri', solved: 22, target: 18 },
  { day: 'Sat', solved: 14, target: 18 },
  { day: 'Sun', solved: 10, target: 18 },
];

const topicPerf = [
  { topic: 'DSA',         score: 78 },
  { topic: 'System Design', score: 65 },
  { topic: 'SQL',         score: 85 },
  { topic: 'HR Round',    score: 92 },
  { topic: 'Behavioral',  score: 88 },
];

const accuracyTrend = [
  { week: 'Wk 1', accuracy: 68 },
  { week: 'Wk 2', accuracy: 73 },
  { week: 'Wk 3', accuracy: 79 },
  { week: 'Wk 4', accuracy: 84 },
];

const skillDist = [
  { name: 'Expert',       value: 8  },
  { name: 'Proficient',   value: 15 },
  { name: 'Intermediate', value: 22 },
  { name: 'Beginner',     value: 12 },
];

const PIE_COLORS = ['#6366f1', '#14b8a6', '#f59e0b', '#e2e8f0'];

const recentActivity = [
  { id: 1, type: 'interview', title: 'System Design — Netflix', time: '2 h ago',   score: 8.5 },
  { id: 2, type: 'problem',   title: 'Binary Tree Level Order', time: '1 day ago', status: 'solved' },
  { id: 3, type: 'hr',        title: 'Behavioral Questions Round', time: '3 days ago', score: 9.0 },
  { id: 4, type: 'challenge', title: 'LeetCode Hard — String Processing', time: '4 days ago', status: 'in-progress' },
];

const sessions = [
  { id: 1, title: 'DSA Revision',           date: 'Today',  time: '3:00 PM', category: 'DSA' },
  { id: 2, title: 'Mock Interview',          date: 'Jun 30', time: '2:00 PM', category: 'Interview' },
  { id: 3, title: 'System Design Deep Dive', date: 'Jul 1',  time: '4:00 PM', category: 'Design' },
];

const catColor = { DSA: 'cat-dsa', Interview: 'cat-interview', Design: 'cat-design' };

/* ─── Tooltip customisation ─────────────────────────────────── */
const ChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tooltip">
      <p className="tooltip-label">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} style={{ color: p.color }}>
          {p.name}: <strong>{p.value}</strong>
        </p>
      ))}
    </div>
  );
};

/* ─── Components ─────────────────────────────────────────────── */
function StatCard({ icon: Icon, label, value, sub, trend, accent }) {
  return (
    <div className={`stat-card accent-${accent}`}>
      <div className="stat-top">
        <div className="stat-icon">{Icon({ size: 20 })}</div>
        {trend && (
          <span className="stat-trend">
            <FiTrendingUp size={12} /> {trend}
          </span>
        )}
      </div>
      <p className="stat-value">{value}</p>
      <p className="stat-label">{label}</p>
      {sub && <p className="stat-sub">{sub}</p>}
    </div>
  );
}

function ActivityRow({ item }) {
  const icons = {
    interview: <FiMic size={16} />,
    problem:   <FiZap size={16} />,
    hr:        <FiStar size={16} />,
    challenge: <FiCheck size={16} />,
  };
  return (
    <div className="activity-row">
      <div className={`act-icon act-${item.type}`}>{icons[item.type]}</div>
      <div className="act-body">
        <p className="act-title">{item.title}</p>
        <p className="act-time">{item.time}</p>
      </div>
      <div className="act-badge">
        {item.score != null
          ? <span className="badge badge-score">{item.score}</span>
          : <span className={`badge badge-${item.status === 'solved' ? 'solved' : 'progress'}`}>
              {item.status === 'solved' ? 'Solved' : 'In Progress'}
            </span>}
      </div>
    </div>
  );
}

/* ─── Dashboard ──────────────────────────────────────────────── */
export default function Dashboard() {
  return (
    <div className="dashboard-page">

        {/* Welcome banner */}
        <section className="welcome-banner">
          <div className="welcome-text">
            <h1>Welcome back, Learner </h1>
            <p>You're on a <strong>7-day streak</strong> — keep the momentum going!</p>
          </div>
          <div className="welcome-actions">
            <button className="btn btn-ghost">
              <FiBook size={16} /> Browse Topics
            </button>
          </div>
        </section>

        {/* Stat cards */}
        <section className="stat-grid">
          <StatCard icon={FiMic} label="Questions Solved" value="245"   accent="indigo" />
          <StatCard icon={FiClock}    label="Study Hours"  value="156h"   accent="teal"   />
          <StatCard icon={FiMic}      label="Mock Interviews"  value="18"    accent="amber"  />
          <StatCard icon={FiStar}     label="Avg Score"   value="8.2"  accent="green"  />
        </section>

        {/* Charts row 1 */}
        <section className="charts-row">
          {/* Weekly solved vs target */}
          <div className="chart-card chart-wide">
            <div className="chart-head">
              <h3>Weekly Progress</h3>
              <span className="chart-meta">Problems solved vs daily target</span>
            </div>
            <ResponsiveContainer width="100%" height={230}>
              <BarChart data={weeklyData} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--grid)" vertical={false} />
                <XAxis dataKey="day" tick={{ fill: 'var(--muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'var(--muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip content={<ChartTooltip />} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
                <Bar dataKey="solved" name="Solved" fill="var(--indigo)" radius={[6, 6, 0, 0]} />
                <Bar dataKey="target" name="Target" fill="var(--grid)"   radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Accuracy trend */}
          <div className="chart-card">
            <div className="chart-head">
              <h3>Accuracy Trend</h3>
              <span className="chart-meta trend-up">+16% this month</span>
            </div>
            <ResponsiveContainer width="100%" height={230}>
              <AreaChart data={accuracyTrend}>
                <defs>
                  <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="var(--teal)" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="var(--teal)" stopOpacity={0}    />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--grid)" vertical={false} />
                <XAxis dataKey="week" tick={{ fill: 'var(--muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis domain={[60, 100]} tick={{ fill: 'var(--muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip content={<ChartTooltip />} />
                <Area type="monotone" dataKey="accuracy" name="Accuracy %" stroke="var(--teal)" strokeWidth={2.5} fill="url(#areaGrad)" dot={{ r: 4, fill: 'var(--teal)' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Charts row 2 */}
        <section className="charts-row">
          {/* Topic performance */}
          <div className="chart-card">
            <div className="chart-head">
              <h3>Performance by Topic</h3>
              <span className="chart-meta">Current scores</span>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={topicPerf} layout="vertical" margin={{ left: 100, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--grid)" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} tick={{ fill: 'var(--muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis dataKey="topic" type="category" tick={{ fill: 'var(--body)', fontSize: 12 }} axisLine={false} tickLine={false} width={95} />
                <Tooltip content={<ChartTooltip />} />
                <Bar dataKey="score" name="Score" fill="var(--indigo)" radius={[0, 6, 6, 0]}>
                  {topicPerf.map((_, i) => (
                    <Cell key={i} fill={`hsl(${245 - i * 15}, 75%, ${58 + i * 3}%)`} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Skill donut */}
          <div className="chart-card donut-card">
            <div className="chart-head">
              <h3>Skill Distribution</h3>
              <span className="chart-meta">57 topics total</span>
            </div>
            <div className="donut-layout">
              <ResponsiveContainer width={180} height={180}>
                <PieChart>
                  <Pie data={skillDist} cx="50%" cy="50%" innerRadius={54} outerRadius={78} paddingAngle={3} dataKey="value">
                    {skillDist.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <ul className="donut-legend">
                {skillDist.map((s, i) => (
                  <li key={i}>
                    <span className="legend-dot" style={{ background: PIE_COLORS[i] }} />
                    <span className="legend-name">{s.name}</span>
                    <span className="legend-val">{s.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Bottom row */}
        <section className="bottom-row">
          {/* Recent activity */}
          <div className="panel">
            <div className="panel-head">
              <h3>Recent Activity</h3>
              <a href="#" className="link-all">View all <FiArrowRight size={14} /></a>
            </div>
            <div className="activity-list">
              {recentActivity.map((a) => <ActivityRow key={a.id} item={a} />)}
            </div>
          </div>

          {/* Upcoming sessions */}
          <div className="panel">
            <div className="panel-head">
              <h3>Upcoming Sessions</h3>
              <button className="btn btn-ghost btn-sm"><FiCalendar size={14} /> Add</button>
            </div>
            <div className="sessions-list">
              {sessions.map((s) => (
                <div key={s.id} className="session-row">
                  <div className="session-date-col">
                    <span className="session-date">{s.date}</span>
                    <span className="session-time">{s.time}</span>
                  </div>
                  <div className="session-info">
                    <p className="session-title">{s.title}</p>
                    <span className={`session-tag ${catColor[s.category]}`}>{s.category}</span>
                  </div>
                  <button className="btn btn-ghost btn-sm">Join</button>
                </div>
              ))}
            </div>

            {/* Quick actions */}
            <div className="quick-actions">
              <button className="btn btn-primary btn-block">
                <FiPlay size={15} /> Start Interview Now
              </button>
              <div className="qa-row">
                <button className="btn btn-outline"><FiBarChart2 size={15} /> Analytics</button>
                <button className="btn btn-outline"><FiZap size={15} /> Daily Challenge</button>
              </div>
            </div>
          </div>
        </section>

    </div>
  );
}
