export default function TopNav({ page, navigate }) {
  const links = [
    { id: "dashboard", label: "Dashboard" },
    { id: "coding", label: "Practice" },
    { id: "mock-interview", label: "Mock Tests" },
    { id: "resume", label: "Resources" },
  ];

  return (
    <div style={{ background: "#141720", borderBottom: "1px solid #2A2F42", padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ fontFamily: "var(--fh)", fontSize: 18, fontWeight: 700, color: "#6C63FF", cursor: "pointer" }} onClick={() => navigate("dashboard")}>
          prep<span style={{ color: "#00D4AA" }}>AI</span>
        </div>
        <div style={{ display: "flex", gap: 4, marginLeft: 20 }}>
          {links.map(l => (
            <button key={l.id} onClick={() => navigate(l.id)} style={{
              background: "transparent", border: "none", padding: "6px 14px", fontSize: 12,
              color: page === l.id ? "#E8EAF0" : "#7B8099", borderRadius: 6,
              background: page === l.id ? "#1A1E2B" : "transparent",
            }}>{l.label}</button>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <button onClick={() => navigate("profile")} style={{
          width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg,#6C63FF,#00D4AA)",
          border: "none", color: "#fff", fontSize: 12, fontWeight: 500, display: "flex", alignItems: "center", justifyContent: "center"
        }}>RK</button>
      </div>
    </div>
  );
}