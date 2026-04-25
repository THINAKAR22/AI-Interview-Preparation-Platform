import { useState } from "react";

const CATEGORIES = ["All", "Tell Me About Yourself", "Strengths & Weaknesses", "Situational", "Leadership", "Motivation", "Teamwork"];

const HR_QS = [
  { id: 1, q: "Tell me about yourself.", category: "Tell Me About Yourself", difficulty: "Common", tips: "Use the Present-Past-Future formula. Keep it under 2 minutes. Tailor to the job role.", starred: true },
  { id: 2, q: "What is your greatest strength?", category: "Strengths & Weaknesses", difficulty: "Common", tips: "Pick one specific strength. Back it with a concrete example using STAR method.", starred: false },
  { id: 3, q: "What is your greatest weakness?", category: "Strengths & Weaknesses", difficulty: "Tricky", tips: "Choose a real weakness. Show self-awareness and what you're doing to improve it.", starred: true },
  { id: 4, q: "Tell me about a time you faced a challenge at work or school.", category: "Situational", difficulty: "Common", tips: "Use STAR: Situation, Task, Action, Result. Emphasize what you learned.", starred: false },
  { id: 5, q: "Where do you see yourself in 5 years?", category: "Motivation", difficulty: "Common", tips: "Show ambition aligned with the company's growth path. Avoid vague answers.", starred: false },
  { id: 6, q: "Why do you want to work at this company?", category: "Motivation", difficulty: "Common", tips: "Research the company. Mention specific products, culture, or values that appeal to you.", starred: true },
  { id: 7, q: "Describe a time you worked in a team to achieve a goal.", category: "Teamwork", difficulty: "Common", tips: "Highlight collaboration, conflict resolution, and your specific contribution.", starred: false },
  { id: 8, q: "Tell me about a time you showed leadership.", category: "Leadership", difficulty: "Medium", tips: "Even for freshers: leading a college project or organizing an event counts.", starred: false },
];

const diffColor = { Common: "#00D4AA", Tricky: "#FBBF24", Medium: "#60A5FA" };
const diffBg = { Common: "#0D2620", Tricky: "#2A1E08", Medium: "#0D1C30" };

const SAMPLE_ANSWER = `My name is Ravi, and I recently graduated with a B.Tech in Computer Science from VIT Chennai. 

During my degree, I developed strong problem-solving skills and worked on projects involving full-stack development — building a job portal using React and Node.js as my final year project.

I've also done a 3-month internship at a startup where I worked on REST APIs and improved database query performance by 30%.

I'm excited about this role because it aligns perfectly with my skills in backend development, and I'm eager to contribute to your engineering team while continuing to grow as a developer.`;

export default function HRQuestions({ navigate }) {
  const [cat, setCat] = useState("All");
  const [activeQ, setActiveQ] = useState(null);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);
  const [starred, setStarred] = useState(HR_QS.filter(q => q.starred).map(q => q.id));
  const [tab, setTab] = useState("practice");

  const filtered = HR_QS.filter(q => cat === "All" || q.category === cat);

  const getAIFeedback = () => {
    setLoading(true);
    setTimeout(() => {
      setFeedback({
        score: 82,
        strengths: ["Clear structure with present-past-future format", "Specific metrics mentioned (30% improvement)", "Relevant project example cited"],
        improve: ["Add more enthusiasm about why this specific company", "Mention one soft skill with an example"],
        suggestion: "Consider ending with a question about the team to show engagement.",
      });
      setLoading(false);
    }, 1400);
  };

  return (
    <div className="fade-in" style={{ padding: "20px 24px" }}>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontFamily: "var(--fh)", fontSize: 20, fontWeight: 700, marginBottom: 4 }}>HR Question Bank</h2>
        <p style={{ fontSize: 12, color: "#7B8099" }}>Practice behavioral questions with AI feedback and STAR templates</p>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", borderBottom: "1px solid #2A2F42", marginBottom: 16 }}>
        {["practice", "starred", "star method"].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            background: "transparent", border: "none", padding: "10px 14px", fontSize: 12,
            color: tab === t ? "#6C63FF" : "#7B8099",
            borderBottom: `2px solid ${tab === t ? "#6C63FF" : "transparent"}`,
            marginBottom: -1, textTransform: "capitalize",
          }}>{t}</button>
        ))}
      </div>

      {tab === "star method" ? (
        <div>
          {[
            { letter: "S", word: "Situation", color: "#6C63FF", desc: "Set the context. Describe where and when the situation occurred.", example: "During my final year internship at a startup..." },
            { letter: "T", word: "Task", color: "#00D4AA", desc: "Explain your specific responsibility or challenge in that situation.", example: "I was tasked with optimizing the database queries..." },
            { letter: "A", word: "Action", color: "#FBBF24", desc: "Describe the specific steps YOU took to address the situation.", example: "I analyzed slow queries using EXPLAIN, added indexes..." },
            { letter: "R", word: "Result", color: "#60A5FA", desc: "Share the outcome. Use numbers if possible.", example: "This reduced query time by 30%, improving page load speed." },
          ].map(item => (
            <div key={item.letter} style={{ display: "flex", gap: 14, marginBottom: 16, background: "#1A1E2B", border: "1px solid #2A2F42", borderRadius: 8, padding: 16 }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: item.color + "22", border: `1px solid ${item.color}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--fh)", fontSize: 18, fontWeight: 700, color: item.color, flexShrink: 0 }}>{item.letter}</div>
              <div>
                <div style={{ fontFamily: "var(--fh)", fontSize: 14, fontWeight: 500, color: item.color, marginBottom: 4 }}>{item.word}</div>
                <div style={{ fontSize: 12, color: "#7B8099", lineHeight: 1.6, marginBottom: 8 }}>{item.desc}</div>
                <div style={{ fontFamily: "var(--fm)", fontSize: 11, color: "#4A5068", fontStyle: "italic" }}>e.g. "{item.example}"</div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {/* Category filter */}
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
            {CATEGORIES.map(c => (
              <button key={c} onClick={() => setCat(c)} style={{
                background: cat === c ? "#6C63FF" : "#1A1E2B",
                border: `1px solid ${cat === c ? "#6C63FF" : "#2A2F42"}`,
                color: cat === c ? "#fff" : "#7B8099",
                borderRadius: 20, padding: "4px 10px", fontSize: 10,
              }}>{c}</button>
            ))}
          </div>

          {/* Question list or practice panel */}
          {activeQ ? (
            <div>
              <button onClick={() => { setActiveQ(null); setFeedback(null); setAnswer(""); }} style={{ background: "transparent", border: "none", color: "#7B8099", fontSize: 12, marginBottom: 14, padding: 0, display: "flex", alignItems: "center", gap: 6 }}>
                ← Back to questions
              </button>
              <div style={{ background: "#1A1E2B", border: "1px solid #2A2F42", borderRadius: 8, padding: 16, marginBottom: 14 }}>
                <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                  <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 4, background: diffBg[activeQ.difficulty], color: diffColor[activeQ.difficulty] }}>{activeQ.difficulty}</span>
                  <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 4, background: "#141720", color: "#7B8099", border: "1px solid #2A2F42" }}>{activeQ.category}</span>
                </div>
                <div style={{ fontFamily: "var(--fh)", fontSize: 15, fontWeight: 500, marginBottom: 10 }}>{activeQ.q}</div>
                <div style={{ background: "#141720", borderRadius: 6, padding: 10, border: "1px solid #2A2F42" }}>
                  <div style={{ fontSize: 10, color: "#6C63FF", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.8 }}>💡 Tip</div>
                  <div style={{ fontSize: 12, color: "#7B8099", lineHeight: 1.6 }}>{activeQ.tips}</div>
                </div>
              </div>

              <textarea
                value={answer}
                onChange={e => setAnswer(e.target.value)}
                placeholder="Type your answer here using the STAR method..."
                rows={6}
                style={{ width: "100%", background: "#1A1E2B", border: "1px solid #2A2F42", borderRadius: 8, padding: "12px 14px", fontSize: 12, color: "#E8EAF0", outline: "none", resize: "vertical", lineHeight: 1.7, marginBottom: 10 }}
              />
              <button onClick={() => { setAnswer(SAMPLE_ANSWER); }} style={{ background: "transparent", border: "1px solid #2A2F42", color: "#7B8099", borderRadius: 6, padding: "6px 14px", fontSize: 11, marginRight: 8 }}>
                See sample answer
              </button>
              <button onClick={getAIFeedback} disabled={!answer.trim()} style={{ background: answer.trim() ? "#6C63FF" : "#1A1E2B", border: "none", color: answer.trim() ? "#fff" : "#4A5068", borderRadius: 6, padding: "6px 16px", fontSize: 12, fontWeight: 500 }}>
                {loading ? "Analyzing..." : "Get AI Feedback ↗"}
              </button>

              {feedback && (
                <div style={{ marginTop: 16, background: "#141720", border: "1px solid #2A2F42", borderRadius: 8, overflow: "hidden" }}>
                  <div style={{ padding: "12px 16px", borderBottom: "1px solid #2A2F42", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontFamily: "var(--fh)", fontSize: 14, fontWeight: 500 }}>AI Feedback</span>
                    <span style={{ fontFamily: "var(--fh)", fontSize: 22, fontWeight: 700, color: "#6C63FF" }}>{feedback.score}/100</span>
                  </div>
                  <div style={{ padding: 16 }}>
                    <div style={{ fontSize: 11, color: "#00D4AA", marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.8 }}>What worked well</div>
                    {feedback.strengths.map((s, i) => (
                      <div key={i} style={{ display: "flex", gap: 8, fontSize: 12, color: "#7B8099", marginBottom: 6 }}>
                        <span style={{ color: "#00D4AA", flexShrink: 0 }}>✓</span>{s}
                      </div>
                    ))}
                    <div style={{ fontSize: 11, color: "#FBBF24", margin: "12px 0 8px", textTransform: "uppercase", letterSpacing: 0.8 }}>Improve</div>
                    {feedback.improve.map((s, i) => (
                      <div key={i} style={{ display: "flex", gap: 8, fontSize: 12, color: "#7B8099", marginBottom: 6 }}>
                        <span style={{ color: "#FBBF24", flexShrink: 0 }}>→</span>{s}
                      </div>
                    ))}
                    <div style={{ marginTop: 12, background: "#1A1E2B", borderRadius: 6, padding: 10, fontSize: 12, color: "#7B8099", lineHeight: 1.6 }}>
                      <strong style={{ color: "#6C63FF", fontWeight: 500 }}>Suggestion: </strong>{feedback.suggestion}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div style={{ border: "1px solid #2A2F42", borderRadius: 8, overflow: "hidden" }}>
              {(tab === "starred" ? filtered.filter(q => starred.includes(q.id)) : filtered).map((q, i, arr) => (
                <div key={q.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 16px", borderBottom: i < arr.length - 1 ? "1px solid #2A2F42" : "none", cursor: "pointer" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#1A1E2B"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  <button onClick={e => { e.stopPropagation(); setStarred(s => s.includes(q.id) ? s.filter(x => x !== q.id) : [...s, q.id]); }} style={{ background: "transparent", border: "none", color: starred.includes(q.id) ? "#FBBF24" : "#4A5068", fontSize: 14, flexShrink: 0, padding: 0 }}>★</button>
                  <div style={{ flex: 1 }} onClick={() => setActiveQ(q)}>
                    <div style={{ fontSize: 13, color: "#E8EAF0", marginBottom: 3 }}>{q.q}</div>
                    <div style={{ fontSize: 10, color: "#4A5068" }}>{q.category}</div>
                  </div>
                  <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 4, background: diffBg[q.difficulty], color: diffColor[q.difficulty], flexShrink: 0 }}>{q.difficulty}</span>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}