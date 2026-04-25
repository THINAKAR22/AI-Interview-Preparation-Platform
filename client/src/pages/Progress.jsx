import { useState } from "react";

const weekData = [
  { day: "Mon", problems: 4, hr: 2 },
  { day: "Tue", problems: 7, hr: 0 },
  { day: "Wed", problems: 2, hr: 5 },
  { day: "Thu", problems: 9, hr: 3 },
  { day: "Fri", problems: 5, hr: 4 },
  { day: "Sat", problems: 11, hr: 6 },
  { day: "Sun", problems: 3, hr: 1 },
];

const badges = [
  { icon: "🔥", title: "7-Day Streak", desc: "Practiced 7 days in a row", earned: true },
  { icon: "💻", title: "Code Warrior", desc: "Solved 50+ DSA problems", earned: true },
  { icon: "🎯", title: "HR Pro", desc: "Completed 20 HR sessions", earned: false },
  { icon: "⚡", title: "Speed Coder", desc: "Solved 5 problems under 10 min each", earned: false },
  { icon: "🏆", title: "Top Scorer", desc: "Achieved 90+ in a mock interview", earned: false },
  { icon: "🌟", title: "All Rounder", desc: "Complete all topic categories", earned: false },
];

const history = [
  { date: "Today", type: "Mock Interview", topic: "TCS NQT Pattern", score: 87, time: "45m" },
  { date: "Yesterday", type: "Coding", topic: "Arrays & Hashing — 8 problems", score: null, time: "1h 12m" },
  { date: "Yesterday", type: "HR Practice", topic: "Tell me about yourself", score: 74, time: "20m" },
  { date: "Apr 23", type: "Coding", topic: "Binary Trees — 5 problems", score: null, time: "55m" },
  { date: "Apr 22", type: "Mock Interview", topic: "Infosys Prep Round", score: 81, time: "40m" },
];

const typeColor = { "Mock Interview": "#6C63FF", "Coding": "#00D4AA", "HR Practice": "#60A5FA" };
const typeBg = { "Mock Interview": "#1E1A40", "Coding": "#0D2620", "HR Practice": "#0D1C30" };

const maxProblems = Math.max(...weekData.map(d => d.problems + d.hr));

export default function Progress({ navigate }) {
  const [view, setView] = useState("week");

  return (
    <div className="fade-in" style={{ padding: "20px 24px" }}>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontFamily: "var(--fh)", fontSize: 20, fontWeight: 700, marginBottom: 4 }}>Progress</h2>
        <p style={{ fontSize: 12, color: "#7B8099" }}>Track your preparation across all areas</p>
      </div>

      {/* Summary metrics */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10, marginBottom: 20 }}>
        {[
          { label: "Total hours", val: "24h", color: "#6C63FF" },
          { label: "Problems solved", val: "41", color: "#00D4AA" },
          { label: "Mock interviews", val: "5", color: "#FBBF24" },
          { label: "Current streak", val: "7 days 🔥", color: "#F06595" },
        ].map(m => (
          <div key={m.label} style={{ background: "#1A1E2B", border: "1px solid #2A2F42", borderRadius: 8, padding: "12px 14px" }}>
            <div style={{ fontSize: 11, color: "#7B8099", marginBottom: 4 }}>{m.label}</div>
            <div style={{ fontFamily: "var(--fh)", fontSize: 20, fontWeight: 700, color: m.color }}>{m.val}</div>
          </div>
        ))}
      </div>

      {/* Bar chart */}
      <div style={{ background: "#1A1E2B", border: "1px solid #2A2F42", borderRadius: 8, padding: 16, marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 500, color: "#E8EAF0" }}>This week</div>
          <div style={{ display: "flex", gap: 12 }}>
            <span style={{ fontSize: 11, color: "#6C63FF", display: "flex", alignItems: "center", gap: 4 }}><span style={{ width: 8, height: 8, borderRadius: 2, background: "#6C63FF", display: "inline-block" }} />Coding</span>
            <span style={{ fontSize: 11, color: "#00D4AA", display: "flex", alignItems: "center", gap: 4 }}><span style={{ width: 8, height: 8, borderRadius: 2, background: "#00D4AA", display: "inline-block" }} />HR</span>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 100 }}>
          {weekData.map(d => (
            <div key={d.day} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
              <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 2, justifyContent: "flex-end", height: 80 }}>
                <div style={{ width: "100%", background: "#6C63FF", borderRadius: "3px 3px 0 0", height: `${(d.problems / maxProblems) * 70}px`, minHeight: d.problems ? 4 : 0 }} />
                <div style={{ width: "100%", background: "#00D4AA", borderRadius: "0 0 3px 3px", height: `${(d.hr / maxProblems) * 70}px`, minHeight: d.hr ? 4 : 0 }} />
              </div>
              <div style={{ fontSize: 10, color: "#4A5068" }}>{d.day}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Topic breakdown */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 12, color: "#7B8099", marginBottom: 12, textTransform: "uppercase", letterSpacing: 0.8 }}>Topic Mastery</div>
        {[
          { topic: "Arrays", pct: 80, solved: 16, total: 20 },
          { topic: "Strings", pct: 65, solved: 13, total: 20 },
          { topic: "Trees", pct: 45, solved: 9, total: 20 },
          { topic: "DP", pct: 30, solved: 6, total: 20 },
          { topic: "Graphs", pct: 15, solved: 3, total: 20 },
          { topic: "HR Questions", pct: 55, solved: 22, total: 40 },
        ].map(t => (
          <div key={t.topic} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
            <span style={{ fontSize: 12, color: "#E8EAF0", width: 110, flexShrink: 0 }}>{t.topic}</span>
            <div style={{ flex: 1, height: 6, background: "#2A2F42", borderRadius: 3, overflow: "hidden" }}>
              <div style={{ width: `${t.pct}%`, height: "100%", background: t.pct >= 70 ? "#00D4AA" : t.pct >= 40 ? "#6C63FF" : "#FBBF24", borderRadius: 3, transition: "width 0.5s" }} />
            </div>
            <span style={{ fontSize: 11, color: "#4A5068", width: 44, textAlign: "right", flexShrink: 0 }}>{t.solved}/{t.total}</span>
          </div>
        ))}
      </div>

      {/* Badges */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 12, color: "#7B8099", marginBottom: 12, textTransform: "uppercase", letterSpacing: 0.8 }}>Badges</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
          {badges.map(b => (
            <div key={b.title} style={{ background: b.earned ? "#1A1E2B" : "#141720", border: `1px solid ${b.earned ? "#2A2F42" : "#1E1E28"}`, borderRadius: 8, padding: "12px 8px", textAlign: "center", opacity: b.earned ? 1 : 0.5 }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>{b.icon}</div>
              <div style={{ fontSize: 11, fontWeight: 500, color: b.earned ? "#E8EAF0" : "#4A5068", marginBottom: 3 }}>{b.title}</div>
              <div style={{ fontSize: 9, color: "#4A5068", lineHeight: 1.4 }}>{b.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* History */}
      <div>
        <div style={{ fontSize: 12, color: "#7B8099", marginBottom: 12, textTransform: "uppercase", letterSpacing: 0.8 }}>Session History</div>
        <div style={{ border: "1px solid #2A2F42", borderRadius: 8, overflow: "hidden" }}>
          {history.map((h, i) => (
            <div key={i} style={{ display: "flex", gap: 12, padding: "11px 14px", borderBottom: i < history.length - 1 ? "1px solid #2A2F42" : "none", alignItems: "center" }}>
              <div style={{ flexShrink: 0 }}>
                <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 4, background: typeBg[h.type], color: typeColor[h.type] }}>{h.type}</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, color: "#E8EAF0" }}>{h.topic}</div>
                <div style={{ fontSize: 10, color: "#4A5068", marginTop: 2 }}>{h.date} · {h.time}</div>
              </div>
              {h.score && <span style={{ fontSize: 13, fontWeight: 500, color: h.score >= 80 ? "#00D4AA" : "#FBBF24" }}>{h.score}</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}