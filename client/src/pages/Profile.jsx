import { useState } from "react";

export default function Profile({ navigate }) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("Ravi Kumar");
  const [college, setCollege] = useState("VIT Chennai");
  const [branch, setBranch] = useState("B.Tech CSE");
  const [target, setTarget] = useState("Software Engineer");
  const [notif, setNotif] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [reminderTime, setReminderTime] = useState("09:00");

  const targets = ["Software Engineer", "Data Analyst", "Full Stack Developer", "Backend Engineer", "DevOps Engineer"];

  return (
    <div className="fade-in" style={{ padding: "20px 24px" }}>
      {/* Profile header */}
      <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 24 }}>
        <div style={{ width: 64, height: 64, borderRadius: "50%", background: "linear-gradient(135deg,#6C63FF,#00D4AA)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--fh)", fontSize: 22, fontWeight: 700, color: "#fff", flexShrink: 0 }}>
          {name.split(" ").map(n => n[0]).join("").toUpperCase()}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "var(--fh)", fontSize: 18, fontWeight: 700 }}>{name}</div>
          <div style={{ fontSize: 12, color: "#7B8099", marginTop: 2 }}>{college} · {branch}</div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "#1E1A40", border: "1px solid #6C63FF", borderRadius: 20, padding: "3px 10px", fontSize: 10, color: "#6C63FF", marginTop: 6 }}>
            🎯 Target: {target}
          </div>
        </div>
        <button onClick={() => setEditing(!editing)} style={{ background: editing ? "#6C63FF" : "transparent", border: "1px solid #2A2F42", color: editing ? "#fff" : "#7B8099", borderRadius: 6, padding: "6px 14px", fontSize: 11 }}>
          {editing ? "Save" : "Edit"}
        </button>
      </div>

      {/* Edit fields */}
      {editing && (
        <div style={{ background: "#1A1E2B", border: "1px solid #2A2F42", borderRadius: 8, padding: 16, marginBottom: 20 }}>
          <div style={{ fontSize: 11, color: "#6C63FF", marginBottom: 12, textTransform: "uppercase", letterSpacing: 0.8 }}>Edit Profile</div>
          {[["Full Name", name, setName], ["College", college, setCollege], ["Branch / Degree", branch, setBranch]].map(([label, val, setter]) => (
            <div key={label} style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 11, color: "#7B8099", marginBottom: 5 }}>{label}</div>
              <input value={val} onChange={e => setter(e.target.value)} style={{ width: "100%", background: "#141720", border: "1px solid #2A2F42", borderRadius: 6, padding: "8px 12px", fontSize: 12, color: "#E8EAF0", outline: "none" }} />
            </div>
          ))}
          <div style={{ marginBottom: 0 }}>
            <div style={{ fontSize: 11, color: "#7B8099", marginBottom: 5 }}>Target Role</div>
            <select value={target} onChange={e => setTarget(e.target.value)} style={{ width: "100%", background: "#141720", border: "1px solid #2A2F42", borderRadius: 6, padding: "8px 12px", fontSize: 12, color: "#E8EAF0", outline: "none" }}>
              {targets.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
        </div>
      )}

      {/* Quick stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginBottom: 20 }}>
        {[
          { label: "Streak", val: "7 🔥", sub: "days" },
          { label: "Solved", val: "41", sub: "problems" },
          { label: "Sessions", val: "18", sub: "completed" },
        ].map(s => (
          <div key={s.label} style={{ background: "#1A1E2B", border: "1px solid #2A2F42", borderRadius: 8, padding: "12px 10px", textAlign: "center" }}>
            <div style={{ fontFamily: "var(--fh)", fontSize: 18, fontWeight: 700, color: "#6C63FF" }}>{s.val}</div>
            <div style={{ fontSize: 10, color: "#7B8099", marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Target companies */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 12, color: "#7B8099", marginBottom: 10, textTransform: "uppercase", letterSpacing: 0.8 }}>Target Companies</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {["TCS", "Infosys", "Wipro", "Cognizant", "+ Add"].map(c => (
            <span key={c} style={{ fontSize: 12, background: c === "+ Add" ? "transparent" : "#1A1E2B", border: `1px solid ${c === "+ Add" ? "#2A2F42" : "#2A2F42"}`, borderRadius: 6, padding: "6px 14px", color: c === "+ Add" ? "#6C63FF" : "#E8EAF0", cursor: "pointer", borderStyle: c === "+ Add" ? "dashed" : "solid" }}>
              {c}
            </span>
          ))}
        </div>
      </div>

      {/* Settings */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 12, color: "#7B8099", marginBottom: 10, textTransform: "uppercase", letterSpacing: 0.8 }}>Settings</div>
        <div style={{ background: "#1A1E2B", border: "1px solid #2A2F42", borderRadius: 8, overflow: "hidden" }}>
          {[
            { label: "Daily reminder notifications", val: notif, toggle: () => setNotif(!notif) },
            { label: "Dark mode", val: darkMode, toggle: () => setDarkMode(!darkMode) },
          ].map((s, i) => (
            <div key={s.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 16px", borderBottom: i === 0 ? "1px solid #2A2F42" : "none" }}>
              <span style={{ fontSize: 13, color: "#E8EAF0" }}>{s.label}</span>
              <div onClick={s.toggle} style={{ width: 40, height: 22, borderRadius: 11, background: s.val ? "#6C63FF" : "#2A2F42", cursor: "pointer", position: "relative", transition: "background 0.2s" }}>
                <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#fff", position: "absolute", top: 3, left: s.val ? 20 : 3, transition: "left 0.2s" }} />
              </div>
            </div>
          ))}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 16px" }}>
            <span style={{ fontSize: 13, color: "#E8EAF0" }}>Daily practice reminder</span>
            <input type="time" value={reminderTime} onChange={e => setReminderTime(e.target.value)} style={{ background: "#141720", border: "1px solid #2A2F42", borderRadius: 6, padding: "4px 8px", fontSize: 12, color: "#E8EAF0", outline: "none" }} />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <button onClick={() => navigate("dashboard")} style={{ background: "#6C63FF", border: "none", color: "#fff", borderRadius: 8, padding: 12, fontSize: 13, fontWeight: 500 }}>
          Go to Dashboard
        </button>
        <button style={{ background: "transparent", border: "1px solid #3A1E2A", color: "#F06595", borderRadius: 8, padding: 12, fontSize: 13 }}>
          Log Out
        </button>
      </div>
    </div>
  );
}