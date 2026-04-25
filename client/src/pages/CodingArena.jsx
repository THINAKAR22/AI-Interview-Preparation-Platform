import { useState } from "react";

const TOPICS = ["All", "Arrays", "Strings", "Trees", "DP", "Graphs", "Hashing", "Sorting"];
const DIFFICULTIES = ["All", "Easy", "Medium", "Hard"];

const PROBLEMS = [
  { id: 1, title: "Two Sum", difficulty: "Easy", topic: "Hashing", companies: ["Google", "Amazon"], solved: true, attempts: 3 },
  { id: 2, title: "Best Time to Buy and Sell Stock", difficulty: "Easy", topic: "Arrays", companies: ["Amazon", "Meta"], solved: true, attempts: 1 },
  { id: 3, title: "Valid Parentheses", difficulty: "Easy", topic: "Strings", companies: ["Meta", "Microsoft"], solved: false, attempts: 2 },
  { id: 4, title: "Merge Two Sorted Lists", difficulty: "Easy", topic: "Trees", companies: ["Amazon"], solved: false, attempts: 0 },
  { id: 5, title: "Maximum Subarray", difficulty: "Medium", topic: "DP", companies: ["Google", "Microsoft"], solved: false, attempts: 1 },
  { id: 6, title: "Binary Tree Level Order Traversal", difficulty: "Medium", topic: "Trees", companies: ["Amazon", "Uber"], solved: false, attempts: 0 },
  { id: 7, title: "Coin Change", difficulty: "Medium", topic: "DP", companies: ["Google", "Lyft"], solved: false, attempts: 0 },
  { id: 8, title: "Word Search", difficulty: "Medium", topic: "Graphs", companies: ["Microsoft", "Snap"], solved: false, attempts: 0 },
  { id: 9, title: "Trapping Rain Water", difficulty: "Hard", topic: "Arrays", companies: ["Google", "Amazon", "Apple"], solved: false, attempts: 0 },
  { id: 10, title: "Serialize and Deserialize Binary Tree", difficulty: "Hard", topic: "Trees", companies: ["Google", "Meta"], solved: false, attempts: 0 },
];

const diffColor = { Easy: "#00D4AA", Medium: "#FBBF24", Hard: "#F06595" };
const diffBg = { Easy: "#0D2620", Medium: "#2A1E08", Hard: "#2A1020" };

export default function CodingArena({ navigate }) {
  const [topic, setTopic] = useState("All");
  const [diff, setDiff] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = PROBLEMS.filter(p =>
    (topic === "All" || p.topic === topic) &&
    (diff === "All" || p.difficulty === diff) &&
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  const solved = PROBLEMS.filter(p => p.solved).length;

  return (
    <div className="fade-in" style={{ padding: "20px 24px" }}>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontFamily: "var(--fh)", fontSize: 20, fontWeight: 700, marginBottom: 4 }}>Coding Arena</h2>
        <p style={{ fontSize: 12, color: "#7B8099" }}>Practice DSA problems curated for campus placements</p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 20 }}>
        {[
          { label: "Solved", val: solved, color: "#00D4AA" },
          { label: "Attempted", val: PROBLEMS.filter(p => p.attempts > 0).length, color: "#FBBF24" },
          { label: "Total", val: PROBLEMS.length, color: "#6C63FF" },
        ].map(s => (
          <div key={s.label} style={{ background: "#1A1E2B", borderRadius: 8, padding: "12px 14px", border: "1px solid #2A2F42" }}>
            <div style={{ fontSize: 11, color: "#7B8099" }}>{s.label}</div>
            <div style={{ fontFamily: "var(--fh)", fontSize: 22, fontWeight: 700, color: s.color }}>{s.val}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ marginBottom: 14 }}>
        <input
          placeholder="Search problems..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ width: "100%", background: "#1A1E2B", border: "1px solid #2A2F42", borderRadius: 8, padding: "9px 14px", fontSize: 12, color: "#E8EAF0", outline: "none", marginBottom: 10 }}
        />
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 8 }}>
          {TOPICS.map(t => (
            <button key={t} onClick={() => setTopic(t)} style={{
              background: topic === t ? "#6C63FF" : "#1A1E2B",
              border: `1px solid ${topic === t ? "#6C63FF" : "#2A2F42"}`,
              color: topic === t ? "#fff" : "#7B8099",
              borderRadius: 20, padding: "4px 12px", fontSize: 11,
            }}>{t}</button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {DIFFICULTIES.map(d => (
            <button key={d} onClick={() => setDiff(d)} style={{
              background: diff === d ? (diffBg[d] || "#1E1A40") : "#1A1E2B",
              border: `1px solid ${diff === d ? (diffColor[d] || "#6C63FF") : "#2A2F42"}`,
              color: diff === d ? (diffColor[d] || "#6C63FF") : "#7B8099",
              borderRadius: 20, padding: "4px 12px", fontSize: 11,
            }}>{d}</button>
          ))}
        </div>
      </div>

      {/* Problem list */}
      <div style={{ border: "1px solid #2A2F42", borderRadius: 8, overflow: "hidden" }}>
        {filtered.map((p, i) => (
          <div key={p.id} onClick={() => navigate("mock-interview")} style={{
            display: "flex", alignItems: "center", gap: 14, padding: "12px 16px",
            borderBottom: i < filtered.length - 1 ? "1px solid #2A2F42" : "none",
            cursor: "pointer", transition: "background 0.1s",
          }}
            onMouseEnter={e => e.currentTarget.style.background = "#1A1E2B"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
            <div style={{ width: 20, height: 20, borderRadius: "50%", border: `1.5px solid ${p.solved ? "#00D4AA" : "#2A2F42"}`, background: p.solved ? "#0D2620" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              {p.solved && <span style={{ color: "#00D4AA", fontSize: 10 }}>✓</span>}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: "#E8EAF0", marginBottom: 3 }}>{p.title}</div>
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                {p.companies.slice(0, 2).map(c => (
                  <span key={c} style={{ fontSize: 10, color: "#7B8099", background: "#141720", border: "1px solid #2A2F42", borderRadius: 4, padding: "1px 6px" }}>{c}</span>
                ))}
                {p.attempts > 0 && !p.solved && <span style={{ fontSize: 10, color: "#FBBF24" }}>{p.attempts} attempt{p.attempts > 1 ? "s" : ""}</span>}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
              <span style={{ fontSize: 11, fontWeight: 500, color: diffColor[p.difficulty], background: diffBg[p.difficulty], padding: "2px 8px", borderRadius: 4 }}>{p.difficulty}</span>
              <span style={{ fontSize: 10, color: "#4A5068" }}>{p.topic}</span>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div style={{ padding: 32, textAlign: "center", color: "#7B8099", fontSize: 13 }}>No problems match your filters</div>
        )}
      </div>

      <button onClick={() => navigate("mock-interview")} style={{ width: "100%", marginTop: 16, background: "#6C63FF", border: "none", color: "#fff", borderRadius: 8, padding: "12px", fontSize: 13, fontWeight: 500 }}>
        Start Timed Practice Session ↗
      </button>
    </div>
  );
}