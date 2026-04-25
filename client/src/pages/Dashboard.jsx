import { useState } from "react";

const stats = [
  { num: "2,400+", label: "Questions" },
  { num: "50+", label: "Companies" },
  { num: "94%", label: "Placement rate" },
];

const features = [
  { icon: "🤖", title: "AI Mock Interview", desc: "Live simulation with instant feedback and scoring", badge: "Tech + HR", badgeColor: { bg: "#1E1A40", color: "#6C63FF" }, page: "mock-interview" },
  { icon: "💻", title: "Coding Arena", desc: "DSA problems curated for campus placements", badge: "500+ problems", badgeColor: { bg: "#0D2620", color: "#00D4AA" }, page: "coding" },
  { icon: "🎯", title: "HR Question Bank", desc: "Behavioral & situational questions with STAR templates", badge: "STAR method", badgeColor: { bg: "#0D1C30", color: "#60A5FA" }, page: "hr" },
  { icon: "📄", title: "Resume Analyzer", desc: "AI reviews your resume against JD instantly", badge: "ATS-ready", badgeColor: { bg: "#2A1E08", color: "#FBBF24" }, page: "resume" },
];

const tracks = [
  { label: "Data Structures", pct: 72, color: "#6C63FF" },
  { label: "HR / Behavioral", pct: 55, color: "#00D4AA" },
  { label: "System Design", pct: 30, color: "#60A5FA" },
];

const sessions = [
  { icon: "🤖", bg: "#1E1A40", title: "Mock Interview — TCS NQT", sub: "Completed · 45 min", score: "87/100", scoreColor: "#00D4AA" },
  { icon: "💻", bg: "#0D2620", title: "DSA — Arrays & Hashing", sub: "8 problems solved", score: "6/8", scoreColor: "#00D4AA" },
  { icon: "🎯", bg: "#0D1C30", title: "HR Practice — Tell me about yourself", sub: "AI feedback received", score: "74/100", scoreColor: "#FBBF24" },
];

const upcoming = [
  { title: "Full Mock Interview — Infosys", time: "Tomorrow · 10:00 AM", badge: "Booked", badgeColor: { bg: "#1E1A40", color: "#6C63FF" } },
  { title: "Group Discussion Practice", time: "Sat · 3:00 PM · 4 participants", badge: "Open", badgeColor: { bg: "#0D2620", color: "#00D4AA" } },
];

export default function Dashboard({ navigate }) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="fade-in">
      {/* Hero */}
      <div style={{ padding: "28px 24px 20px", borderBottom: "1px solid #2A2F42" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#1E1A40", border: "1px solid #6C63FF", borderRadius: 20, padding: "4px 12px", fontSize: 11, color: "#6C63FF", marginBottom: 14 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#00D4AA", animation: "pulse 1.5s infinite", display: "inline-block" }} />
          AI-Powered Interview Prep
        </div>
        <h1 style={{ fontFamily: "var(--fh)", fontSize: 26, fontWeight: 700, lineHeight: 1.25, marginBottom: 8 }}>
          Land your <span style={{ color: "#00D4AA" }}>dream job</span><br />with smarter prep
        </h1>
        <p style={{ fontSize: 13, color: "#7B8099", lineHeight: 1.7, maxWidth: 420, marginBottom: 20 }}>
          Practice technical and HR interviews with real-time AI feedback. Built for fresh graduates ready to stand out.
        </p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button onClick={() => navigate("mock-interview")} style={{ background: "#6C63FF", color: "#fff", border: "none", borderRadius: 8, padding: "10px 20px", fontSize: 13, fontWeight: 500 }}>
            Start Mock Interview
          </button>
          <button onClick={() => navigate("coding")} style={{ background: "transparent", color: "#E8EAF0", border: "1px solid #2A2F42", borderRadius: 8, padding: "10px 20px", fontSize: 13 }}>
            Browse Questions
          </button>
        </div>
        <div style={{ display: "flex", gap: 28, marginTop: 20 }}>
          {stats.map(s => (
            <div key={s.label}>
              <div style={{ fontFamily: "var(--fh)", fontSize: 20, fontWeight: 700, color: "#6C63FF" }}>{s.num}</div>
              <div style={{ fontSize: 11, color: "#7B8099", marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", borderBottom: "1px solid #2A2F42", padding: "0 24px" }}>
        {["overview", "technical", "hr / behavioral", "resume"].map(t => (
          <button key={t} onClick={() => setActiveTab(t)} style={{
            background: "transparent", border: "none", padding: "11px 14px", fontSize: 12,
            color: activeTab === t ? "#6C63FF" : "#7B8099",
            borderBottom: `2px solid ${activeTab === t ? "#6C63FF" : "transparent"}`,
            marginBottom: -1, textTransform: "capitalize",
          }}>{t}</button>
        ))}
      </div>

      {/* Feature Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "#2A2F42" }}>
        {features.map(f => (
          <div key={f.title} onClick={() => navigate(f.page)} style={{ background: "#1A1E2B", padding: "18px 20px", cursor: "pointer", transition: "background 0.15s" }}
            onMouseEnter={e => e.currentTarget.style.background = "#1F2436"}
            onMouseLeave={e => e.currentTarget.style.background = "#1A1E2B"}>
            <div style={{ width: 34, height: 34, borderRadius: 8, background: "#0D0F14", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, marginBottom: 12 }}>{f.icon}</div>
            <div style={{ fontFamily: "var(--fh)", fontSize: 13, fontWeight: 500, marginBottom: 5 }}>{f.title}</div>
            <div style={{ fontSize: 11, color: "#7B8099", lineHeight: 1.5 }}>{f.desc}</div>
            <div style={{ marginTop: 8, display: "inline-block", fontSize: 10, padding: "2px 8px", borderRadius: 10, ...f.badgeColor }}>{f.badge}</div>
          </div>
        ))}
      </div>

      {/* Progress */}
      <div style={{ padding: "16px 24px", borderBottom: "1px solid #2A2F42" }}>
        <div style={{ fontSize: 11, color: "#7B8099", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 14, fontWeight: 400 }}>Your progress this week</div>
        {tracks.map(t => (
          <div key={t.label} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
            <span style={{ fontSize: 12, color: "#E8EAF0", width: 120, flexShrink: 0 }}>{t.label}</span>
            <div style={{ flex: 1, height: 4, background: "#2A2F42", borderRadius: 2, overflow: "hidden" }}>
              <div style={{ width: `${t.pct}%`, height: "100%", background: t.color, borderRadius: 2 }} />
            </div>
            <span style={{ fontSize: 11, color: "#7B8099", width: 30, textAlign: "right" }}>{t.pct}%</span>
          </div>
        ))}
      </div>

      {/* Recent Sessions */}
      <div style={{ padding: "16px 24px", borderBottom: "1px solid #2A2F42" }}>
        <div style={{ fontSize: 11, color: "#7B8099", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 10 }}>Recent Sessions</div>
        {sessions.map((s, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "9px 0", borderBottom: i < sessions.length - 1 ? "1px solid #2A2F42" : "none" }}>
            <div style={{ width: 28, height: 28, borderRadius: 6, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, flexShrink: 0 }}>{s.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 500, color: "#E8EAF0" }}>{s.title}</div>
              <div style={{ fontSize: 11, color: "#7B8099" }}>{s.sub}</div>
            </div>
            <span style={{ fontSize: 12, fontWeight: 500, color: s.scoreColor }}>{s.score}</span>
          </div>
        ))}
      </div>

      {/* Upcoming */}
      <div style={{ padding: "16px 24px" }}>
        <div style={{ fontSize: 11, color: "#7B8099", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 12 }}>Scheduled Sessions</div>
        {upcoming.map((u, i) => (
          <div key={i} style={{ background: "#141720", border: "1px solid #2A2F42", borderRadius: 8, padding: "12px 14px", marginBottom: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 500 }}>{u.title}</div>
              <div style={{ fontSize: 11, color: "#7B8099", marginTop: 2 }}>{u.time}</div>
            </div>
            <span style={{ fontSize: 10, padding: "3px 10px", borderRadius: 10, ...u.badgeColor }}>{u.badge}</span>
          </div>
        ))}
      </div>
    </div>
  );
}