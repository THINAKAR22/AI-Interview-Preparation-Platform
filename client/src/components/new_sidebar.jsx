import { useState } from 'react';
import {
  FiGrid, FiTarget, FiBook, FiBarChart2, FiCalendar,
  FiZap, FiAward, FiSettings, FiHelpCircle, FiLogOut,
  FiChevronRight,
} from 'react-icons/fi';

const navGroups = [
  {
    label: 'Main',
    items: [
      { icon: FiGrid,     label: 'Dashboard',   active: true,  badge: null },
      { icon: FiTarget,   label: 'Interviews',  active: false, badge: '3' },
      { icon: FiBook,     label: 'Topics',      active: false, badge: null },
      { icon: FiBarChart2,label: 'Analytics',   active: false, badge: null },
    ],
  },
  {
    label: 'Practice',
    items: [
      { icon: FiZap,      label: 'Daily Challenge', active: false, badge: 'New' },
      { icon: FiCalendar, label: 'Schedule',         active: false, badge: null },
      { icon: FiAward,    label: 'Leaderboard',      active: false, badge: null },
    ],
  },
];

export default function SidebarLayout() {
  const [active, setActive] = useState('Dashboard');

  return (
    <aside className="sidebar">
      {/* Progress card */}
      <div className="sidebar-progress-card">
        <div className="progress-card-top">
          <span className="progress-card-label">Weekly Goal</span>
          <span className="progress-card-pct">68%</span>
        </div>
        <div className="progress-bar-track">
          <div className="progress-bar-fill" style={{ width: '68%' }} />
        </div>
        <p className="progress-card-sub">34 of 50 problems solved</p>
      </div>

      <nav className="sidebar-nav">
        {navGroups.map((group) => (
          <div key={group.label} className="nav-group">
            <p className="nav-group-label">{group.label}</p>
            {group.items.map(({ icon: Icon, label, badge }) => (
              <button
                key={label}
                className={`nav-item ${active === label ? 'nav-item-active' : ''}`}
                onClick={() => setActive(label)}
              >
                <Icon size={18} className="nav-icon" />
                <span className="nav-label">{label}</span>
                {badge && <span className="nav-badge">{badge}</span>}
                {active === label && <FiChevronRight size={14} className="nav-arrow" />}
              </button>
            ))}
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="nav-item">
          <FiSettings size={18} className="nav-icon" />
          <span className="nav-label">Settings</span>
        </button>
        <button className="nav-item">
          <FiHelpCircle size={18} className="nav-icon" />
          <span className="nav-label">Help</span>
        </button>
        <button className="nav-item nav-item-danger">
          <FiLogOut size={18} className="nav-icon" />
          <span className="nav-label">Sign Out</span>
        </button>
      </div>
    </aside>
  );
}