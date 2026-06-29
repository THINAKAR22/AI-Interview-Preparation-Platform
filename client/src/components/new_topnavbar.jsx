import { FiBell, FiSearch, FiChevronDown } from 'react-icons/fi';

export default function TopNav() {
  return (
    <header className="topnav">
      <div className="topnav-brand">
        <div className="brand-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
            <path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        <span className="brand-name">PrepAI</span>
      </div>

      <div className="topnav-search">
        <FiSearch size={16} className="search-icon" />
        <input type="text" placeholder="Search topics, interviews…" />
        <kbd>⌘K</kbd>
      </div>

      <div className="topnav-right">
        <button className="topnav-btn start-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5,3 19,12 5,21"/>
          </svg>
          Start Interview
        </button>
        <button className="topnav-icon-btn notif-btn" aria-label="Notifications">
          <FiBell size={18} />
          <span className="notif-dot" />
        </button>
        <div className="topnav-avatar">
          <img src="https://api.dicebear.com/7.x/initials/svg?seed=Learner&backgroundColor=6366f1" alt="avatar" />
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