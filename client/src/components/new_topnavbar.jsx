import { Link } from "react-router-dom";
import { FiBell, FiChevronDown, FiMenu, FiSearch, FiX } from "react-icons/fi";

export default function TopNav({ sidebarOpen, onToggleSidebar }) {
  return (
    <header className="topnav">
      <button
        className="topnav-icon-btn topnav-toggle-btn"
        type="button"
        onClick={onToggleSidebar}
        aria-label={sidebarOpen ? "Hide sidebar" : "Show sidebar"}
      >
        {sidebarOpen ? <FiX size={18} /> : <FiMenu size={18} />}
      </button>
      <Link className="topnav-brand" to="/dashboard" aria-label="PrepAI dashboard">
        <div className="brand-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
            <path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <span className="brand-name">PrepAI</span>
      </Link>

      <div className="topnav-search">
        <FiSearch size={16} className="search-icon" />
        <input type="text" placeholder="Search topics, interviews..." />
        <kbd>Ctrl K</kbd>
      </div>

      <div className="topnav-right">
        <Link className="topnav-btn start-btn" to="/mock-interview">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <polygon points="5,3 19,12 5,21" />
          </svg>
          Start Interview
        </Link>
        <button className="topnav-icon-btn notif-btn" type="button" aria-label="Notifications">
          <FiBell size={18} />
          <span className="notif-dot" />
        </button>
        <div className="topnav-avatar">
          <img
            src="https://api.dicebear.com/7.x/initials/svg?seed=Learner&backgroundColor=6366f1"
            alt="Learner avatar"
          />
          <div className="avatar-info">
            <span className="avatar-name">Learner</span>
            <span className="avatar-role">Pro Plan</span>
          </div>
          <FiChevronDown size={14} className="avatar-chevron" />
        </div>
      </div>
    </header>
  );
}
