import { NavLink } from "react-router-dom";
import {
  FiBarChart2,
  FiChevronRight,
  FiFileText,
  FiGrid,
  FiHelpCircle,
  FiLogOut,
  FiMic,
  FiSettings,
  FiTarget,
  FiUser,
  FiZap,
} from "react-icons/fi";
import { Link } from "react-router-dom";

const navGroups = [
  {
    label: "Main",
    items: [
      { icon: FiGrid, label: "Dashboard", to: "/dashboard" },
      { icon: FiMic, label: "Mock Interview", to: "/mock-interview", badge: "3" },
      { icon: FiTarget, label: "Coding Arena", to: "/coding-arena" },
      { icon: FiFileText, label: "Resume Analyzer", to: "/resume-analyzer" },
    ],
  },
  {
    label: "Workspace",
    items: [
      { icon: FiBarChart2, label: "Progress", to: "/progress" },
      { icon: FiUser, label: "Profile", to: "/profile" },
      { icon: FiZap, label: "Daily Challenge", to: "/coding-arena", badge: "New" },
    ],
  },
];

export default function SidebarLayout({ sidebarOpen }) {
  return (
    <aside className={`sidebar ${sidebarOpen ? "" : "sidebar-collapsed"}`} aria-hidden={!sidebarOpen}>
      <div className="sidebar-progress-card">
        <div className="progress-card-top">
          <span className="progress-card-label">Weekly Goal</span>
          <span className="progress-card-pct">68%</span>
        </div>
        <div className="progress-bar-track">
          <div className="progress-bar-fill" style={{ width: "68%" }} />
        </div>
        <p className="progress-card-sub">34 of 50 problems solved</p>
      </div>

      <nav className="sidebar-nav">
        {navGroups.map((group) => (
          <div key={group.label} className="nav-group">
            <p className="nav-group-label">{group.label}</p>
            {group.items.map(({ icon: Icon, label, to, badge }) => (
              <NavLink
                key={label}
                to={to}
                className={({ isActive }) => `nav-item ${isActive ? "nav-item-active" : ""}`}
              >
                {Icon({ size: 18, className: "nav-icon" })}
                <span className="nav-label">{label}</span>
                {badge && <span className="nav-badge">{badge}</span>}
                <FiChevronRight size={14} className="nav-arrow" />
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <Link className="nav-item" to="/settings">
          <FiSettings size={18} className="nav-icon" />
          <span className="nav-label">Settings</span>
        </Link>
        <Link className="nav-item" to="/help">
          <FiHelpCircle size={18} className="nav-icon" />
          <span className="nav-label">Help</span>
        </Link>
        <Link className="nav-item nav-item-danger" to="/">
          <FiLogOut size={18} className="nav-icon" />
          <span className="nav-label">Sign Out</span>
        </Link>
      </div>
    </aside>
  );
}
