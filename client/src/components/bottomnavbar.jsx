const navItems = [
  { id: "dashboard", label: "Dashboard", icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
      <rect x="3" y="3" width="7" height="7" rx="1"/>
      <rect x="14" y="3" width="7" height="7" rx="1"/>
      <rect x="3" y="14" width="7" height="7" rx="1"/>
      <rect x="14" y="14" width="7" height="7" rx="1"/>
    </svg>
  )},
  { id: "coding", label: "Practice", icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
      <polyline points="16 18 22 12 16 6"/>
      <polyline points="8 6 2 12 8 18"/>
    </svg>
  )},
  { id: "mock-interview", label: "Interview", icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  )},
  { id: "progress", label: "Progress", icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
      <path d="M18 20V10"/>
      <path d="M12 20V4"/>
      <path d="M6 20v-6"/>
    </svg>
  )},
  { id: "profile", label: "Profile", icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  )},
];

export default function Sidebar({ page, navigate }) {
  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "220px",
      height: "100vh",
      background: "#c3c4ca",
      borderRight: "1px solid #89aeb8",
      display: "flex",
      flexDirection: "column",
      padding: "15px 10px"
    }}>
      
      {/* Logo / Title */}
      <h2 style={{ color: "#fff", marginBottom: "20px", textAlign: "center" }}>
        AI Prep
      </h2>

      {/* Nav Items */}
      {navItems.map(item => (
        <button
          key={item.id}
          onClick={() => navigate(item.id)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "10px",
            marginBottom: "8px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            background: page === item.id ? "#1f2333" : "transparent",
            color: page === item.id ? "#6C63FF" : "#7B8099",
            transition: "0.3s"
          }}
          onMouseEnter={(e) => {
            if (page !== item.id) e.target.style.background = "#1a1f2e";
          }}
          onMouseLeave={(e) => {
            if (page !== item.id) e.target.style.background = "transparent";
          }}
        >
          {item.icon}
          <span style={{ fontSize: "14px" }}>{item.label}</span>
        </button>
      ))}

      {/* Bottom Section */}
      <div style={{ marginTop: "auto" }}>
        <button style={{
          width: "100%",
          padding: "10px",
          background: "#ff4d4d",
          border: "none",
          color: "white",
          borderRadius: "6px",
          cursor: "pointer"
        }}>
          Logout
        </button>
      </div>
    </div>
  );
}