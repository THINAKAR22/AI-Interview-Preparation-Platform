import './topnavbar.css';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';

export default function TopNav({ page }) {

  const navigate = useNavigate();

  const links = [
    { id: "dashboard", label: "Dashboard" },
    { id: "coding-arena", label: "Practice" },
    { id: "mock-interview", label: "Mock Tests" },
    { id: "progress", label: "Progress" },
  ];

  return (
    <div className="topnav">

      {/* LEFT */}
      <div className="topnav-left">

        {/* LOGO */}
        <div className="logo">
          <img src={logo} alt="Logo" className="img" />
          prep<span>AI</span>
        </div>

      {/* CENTER - SEARCH BAR */}
      <div className="topnav-center">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search anything..."
            className="search-input"
          />
          <button className="search-btn">
            🔍
          </button>
        </div>
      </div>

      {/* NAV LINKS */}
        <div className="nav-links">

          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => navigate(l.id)}
              className={
                page === l.id
                  ? "nav-btn active"
                  : "nav-btn"
              }
            >
              {l.label}
            </button>
          ))}

        </div>
      </div>

      {/* RIGHT */}
      <div className="topnav-right">

        <button
          className="profile-btn"
          onClick={() => navigate("/profile")}
        >
          TK
        </button>

      </div>

    </div>
  );
}