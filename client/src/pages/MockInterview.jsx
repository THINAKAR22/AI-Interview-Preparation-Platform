import { useState, useEffect } from "react";

const QUESTIONS = [
  {
    type: "technical",
    title: "Two Sum",
    difficulty: "Easy",
    diffColor: "#00D4AA",
    companies: ["Google", "Amazon", "Microsoft"],
    desc: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
    examples: [
      { input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explain: "nums[0] + nums[1] == 9" },
      { input: "nums = [3,2,4], target = 6", output: "[1,2]", explain: "nums[1] + nums[2] == 6" },
    ],
    constraints: ["2 ≤ nums.length ≤ 10⁴", "-10⁹ ≤ nums[i] ≤ 10⁹", "Only one valid answer exists."],
    starterCode: `def twoSum(nums, target):
    # Your solution here
    seen = {}
    for i, n in enumerate(nums):
        diff = target - n
        if diff in seen:
            return [seen[diff], i]
        seen[n] = i`,
  },
  {
    type: "technical",
    title: "Valid Parentheses",
    difficulty: "Easy",
    diffColor: "#00D4AA",
    companies: ["Meta", "Amazon"],
    desc: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if open brackets are closed by the same type, in the correct order.",
    examples: [
      { input: 's = "()"', output: "true" },
      { input: 's = "()[]{}"', output: "true" },
    ],
    constraints: ["1 ≤ s.length ≤ 10⁴", "s consists of parentheses only '()[]{}'"],
    starterCode: `def isValid(s):
    stack = []
    mapping = {')': '(', '}': '{', ']': '['}
    for char in s:
        if char in mapping:
            top = stack.pop() if stack else '#'
            if mapping[char] != top:
                return False
        else:
            stack.append(char)
    return not stack`,
  },
];

const AI_HINTS = [
  "Think about using a hash map to store values you've already seen. What's the time complexity of a lookup in a hash map?",
  "Great start! Consider edge cases — what if the same element can't be used twice?",
  "Your solution looks correct! Can you optimize the space complexity further?",
];

export default function MockInterview({ navigate }) {
  const [qIndex, setQIndex] = useState(0);
  const [code, setCode] = useState(QUESTIONS[0].starterCode);
  const [seconds, setSeconds] = useState(45 * 60);
  const [hintIndex, setHintIndex] = useState(0);
  const [testResult, setTestResult] = useState(null);
  const [running, setRunning] = useState(false);
  const [activeTab, setActiveTab] = useState("problem");
  const [lang, setLang] = useState("Python");
  const [showEndModal, setShowEndModal] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setSeconds(s => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  const fmt = s => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  const q = QUESTIONS[qIndex];

  const runCode = () => {
    setRunning(true);
    setTimeout(() => {
      setTestResult({ pass: true, time: "52ms", mem: "14.2MB" });
      setRunning(false);
    }, 1200);
  };

  const nextQ = () => {
    if (qIndex < QUESTIONS.length - 1) {
      setQIndex(qIndex + 1);
      setCode(QUESTIONS[qIndex + 1].starterCode);
      setTestResult(null);
      setHintIndex(0);
    } else {
      setShowEndModal(true);
    }
  };

  return (
    <div className="fade-in" style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 57px - 64px)" }}>
      {/* Topbar */}
      <div style={{ background: "#141720", borderBottom: "1px solid #2A2F42", padding: "10px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ background: "#1E1A40", border: "1px solid #6C63FF", borderRadius: 4, padding: "2px 8px", fontSize: 11, color: "#6C63FF", fontFamily: "var(--fh)" }}>
            Technical Round · Q{qIndex + 1} of {QUESTIONS.length}
          </div>
        </div>
        <div style={{ fontFamily: "var(--fm)", fontSize: 15, fontWeight: 500, color: seconds < 300 ? "#F06595" : "#FBBF24", background: "#1A1E2B", border: "1px solid #2A2F42", borderRadius: 6, padding: "5px 14px", letterSpacing: 1 }}>
          {fmt(seconds)}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => setShowEndModal(true)} style={{ background: "transparent", border: "1px solid #3A1E2A", color: "#F06595", borderRadius: 6, padding: "5px 12px", fontSize: 11 }}>End Session</button>
          <button onClick={runCode} style={{ background: "#6C63FF", border: "none", color: "#fff", borderRadius: 6, padding: "5px 14px", fontSize: 11, fontWeight: 500 }}>Submit ↗</button>
        </div>
      </div>

      {/* Split layout */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", flex: 1, overflow: "hidden" }}>
        {/* Left: Problem */}
        <div style={{ borderRight: "1px solid #2A2F42", display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div style={{ display: "flex", borderBottom: "1px solid #2A2F42", flexShrink: 0 }}>
            {["problem", "hints", "solutions"].map(t => (
              <button key={t} onClick={() => setActiveTab(t)} style={{
                background: "transparent", border: "none", padding: "10px 16px", fontSize: 11,
                color: activeTab === t ? "#6C63FF" : "#7B8099",
                borderBottom: `2px solid ${activeTab === t ? "#6C63FF" : "transparent"}`,
                marginBottom: -1, textTransform: "capitalize",
              }}>{t}</button>
            ))}
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
            {activeTab === "problem" && (
              <>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: q.diffColor, display: "inline-block" }} />
                  <span style={{ fontSize: 11, color: q.diffColor }}>{q.difficulty}</span>
                </div>
                <div style={{ display: "flex", gap: 6, marginBottom: 12, flexWrap: "wrap" }}>
                  {q.companies.map(c => (
                    <span key={c} style={{ fontSize: 10, background: "#1A1E2B", border: "1px solid #2A2F42", borderRadius: 4, padding: "2px 8px", color: "#7B8099" }}>{c}</span>
                  ))}
                </div>
                <div style={{ fontFamily: "var(--fh)", fontSize: 16, fontWeight: 700, marginBottom: 10 }}>{q.title}</div>
                <div style={{ fontSize: 12, color: "#7B8099", lineHeight: 1.7, marginBottom: 14 }}>{q.desc}</div>
                {q.examples.map((ex, i) => (
                  <div key={i} style={{ background: "#1A1E2B", border: "1px solid #2A2F42", borderRadius: 6, padding: "10px 12px", marginBottom: 10 }}>
                    <div style={{ fontSize: 10, color: "#4A5068", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.8px" }}>Example {i + 1}</div>
                    <div style={{ fontFamily: "var(--fm)", fontSize: 11, color: "#E8EAF0", marginBottom: 3 }}><span style={{ color: "#7B8099" }}>Input: </span>{ex.input}</div>
                    <div style={{ fontFamily: "var(--fm)", fontSize: 11, color: "#E8EAF0", marginBottom: ex.explain ? 3 : 0 }}><span style={{ color: "#7B8099" }}>Output: </span>{ex.output}</div>
                    {ex.explain && <div style={{ fontFamily: "var(--fm)", fontSize: 11, color: "#7B8099" }}>Explanation: {ex.explain}</div>}
                  </div>
                ))}
                <ul style={{ listStyle: "none", fontSize: 11, color: "#7B8099", lineHeight: 1.8, marginTop: 10 }}>
                  {q.constraints.map((c, i) => (
                    <li key={i} style={{ paddingLeft: 12, position: "relative" }}>
                      <span style={{ position: "absolute", left: 0, color: "#6C63FF" }}>·</span>{c}
                    </li>
                  ))}
                </ul>
              </>
            )}
            {activeTab === "hints" && (
              <div>
                {AI_HINTS.slice(0, hintIndex + 1).map((h, i) => (
                  <div key={i} style={{ background: "#1A1E2B", border: "1px solid #2A2F42", borderRadius: 8, padding: 14, marginBottom: 10 }}>
                    <div style={{ fontSize: 10, color: "#6C63FF", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.8 }}>Hint {i + 1}</div>
                    <div style={{ fontSize: 12, color: "#7B8099", lineHeight: 1.6 }}>{h}</div>
                  </div>
                ))}
                {hintIndex < AI_HINTS.length - 1 && (
                  <button onClick={() => setHintIndex(h => h + 1)} style={{ background: "#1E1A40", border: "1px solid #6C63FF", color: "#6C63FF", borderRadius: 6, padding: "8px 16px", fontSize: 12, width: "100%", marginTop: 8 }}>
                    Show next hint
                  </button>
                )}
              </div>
            )}
            {activeTab === "solutions" && (
              <div style={{ fontSize: 12, color: "#7B8099", textAlign: "center", marginTop: 40 }}>
                Solutions will be unlocked after submission.
              </div>
            )}
          </div>
        </div>

        {/* Right: Editor */}
        <div style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div style={{ background: "#141720", borderBottom: "1px solid #2A2F42", padding: "8px 12px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
            <select value={lang} onChange={e => setLang(e.target.value)} style={{ background: "#1A1E2B", border: "1px solid #2A2F42", borderRadius: 5, padding: "4px 10px", fontSize: 11, color: "#E8EAF0" }}>
              <option>Python</option><option>JavaScript</option><option>Java</option><option>C++</option>
            </select>
            <button onClick={runCode} style={{ background: "transparent", border: "1px solid #2A2F42", color: "#E8EAF0", borderRadius: 5, padding: "4px 14px", fontSize: 11 }}>
              {running ? "Running..." : "▶ Run"}
            </button>
          </div>

          <div style={{ flex: 1, background: "#0B0D11", overflowY: "auto" }}>
            <textarea
              value={code}
              onChange={e => setCode(e.target.value)}
              style={{
                width: "100%", height: "100%", minHeight: 220, background: "#0B0D11",
                border: "none", outline: "none", padding: "14px 16px",
                fontFamily: "var(--fm)", fontSize: 12, color: "#ABB2BF",
                lineHeight: 1.8, resize: "none",
              }}
            />
          </div>

          {/* Testcases */}
          <div style={{ borderTop: "1px solid #2A2F42", background: "#141720", flexShrink: 0 }}>
            <div style={{ display: "flex", padding: "0 12px", borderBottom: "1px solid #2A2F42" }}>
              {["Test Case 1", "Test Case 2"].map((t, i) => (
                <button key={i} style={{ background: "transparent", border: "none", padding: "8px 12px", fontSize: 11, color: i === 0 ? "#00D4AA" : "#7B8099", borderBottom: `2px solid ${i === 0 ? "#00D4AA" : "transparent"}`, marginBottom: -1 }}>{t}</button>
              ))}
            </div>
            <div style={{ padding: "10px 12px" }}>
              <div style={{ display: "flex", gap: 10, marginBottom: 8, alignItems: "center" }}>
                <span style={{ fontSize: 11, color: "#7B8099", width: 60 }}>nums =</span>
                <div style={{ fontFamily: "var(--fm)", fontSize: 11, background: "#1A1E2B", border: "1px solid #2A2F42", borderRadius: 4, padding: "4px 10px", color: "#E8EAF0", flex: 1 }}>[2,7,11,15]</div>
              </div>
              <div style={{ display: "flex", gap: 10, marginBottom: 8, alignItems: "center" }}>
                <span style={{ fontSize: 11, color: "#7B8099", width: 60 }}>target =</span>
                <div style={{ fontFamily: "var(--fm)", fontSize: 11, background: "#1A1E2B", border: "1px solid #2A2F42", borderRadius: 4, padding: "4px 10px", color: "#E8EAF0", flex: 1 }}>9</div>
              </div>
              {testResult && (
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 4, fontWeight: 500, background: testResult.pass ? "#0D2620" : "#2A1010", color: testResult.pass ? "#00D4AA" : "#F06595", border: `1px solid ${testResult.pass ? "#1D4A38" : "#4A1010"}` }}>
                    {testResult.pass ? "✓ Accepted" : "✗ Wrong Answer"}
                  </span>
                  <span style={{ fontSize: 10, color: "#7B8099", fontFamily: "var(--fm)" }}>{testResult.time} · {testResult.mem}</span>
                </div>
              )}
            </div>
          </div>

          {/* AI Hint bar */}
          <div style={{ borderTop: "1px solid #2A2F42", background: "#1A1E2B", padding: "10px 14px", display: "flex", gap: 10 }}>
            <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#1E1A40", border: "1px solid #6C63FF", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
              <div style={{ display: "flex", gap: 2 }}>
                {[0,1,2].map(i => <div key={i} style={{ width: 4, height: 4, borderRadius: "50%", background: "#6C63FF", animation: `pulse ${0.4 * i + 0.8}s infinite` }} />)}
              </div>
            </div>
            <div style={{ fontSize: 12, color: "#7B8099", lineHeight: 1.6, flex: 1 }}>
              <strong style={{ color: "#E8EAF0", fontWeight: 500 }}>AI Interviewer:</strong> I see you're working on Two Sum. Think about what data structure allows O(1) average lookup time.
              <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                <button onClick={() => setActiveTab("hints")} style={{ background: "transparent", border: "1px solid #2A2F42", color: "#7B8099", borderRadius: 5, padding: "3px 10px", fontSize: 10 }}>Get hint</button>
                <button style={{ background: "transparent", border: "1px solid #2A2F42", color: "#7B8099", borderRadius: 5, padding: "3px 10px", fontSize: 10 }}>Explain approach</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div style={{ background: "#141720", borderTop: "1px solid #2A2F42", padding: "8px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {QUESTIONS.map((_, i) => (
            <div key={i} style={{ width: 24, height: 5, borderRadius: 3, background: i < qIndex ? "#00D4AA" : i === qIndex ? "#6C63FF" : "#2A2F42" }} />
          ))}
          <span style={{ fontSize: 11, color: "#7B8099", marginLeft: 6 }}>Q{qIndex + 1} / {QUESTIONS.length}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {testResult && <span style={{ fontSize: 11, color: "#7B8099" }}>Score: <span style={{ color: "#E8EAF0", fontWeight: 500 }}>87/100</span></span>}
          <button onClick={nextQ} style={{ background: "#00D4AA", border: "none", color: "#04342C", borderRadius: 6, padding: "6px 16px", fontSize: 11, fontFamily: "var(--fh)", fontWeight: 700 }}>
            {qIndex < QUESTIONS.length - 1 ? "Next Question →" : "Finish →"}
          </button>
        </div>
      </div>

      {/* End modal */}
      {showEndModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200 }}>
          <div style={{ background: "#1A1E2B", border: "1px solid #2A2F42", borderRadius: 12, padding: 28, width: 320, textAlign: "center" }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>🎯</div>
            <div style={{ fontFamily: "var(--fh)", fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Session Complete!</div>
            <div style={{ fontSize: 12, color: "#7B8099", marginBottom: 20 }}>Great job! Here's your performance summary.</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
              {[["Score", "87/100"], ["Time", "22:14"], ["Problems", `${qIndex + 1}/${QUESTIONS.length}`], ["Accuracy", "85%"]].map(([k, v]) => (
                <div key={k} style={{ background: "#141720", borderRadius: 6, padding: "10px" }}>
                  <div style={{ fontSize: 11, color: "#7B8099" }}>{k}</div>
                  <div style={{ fontFamily: "var(--fh)", fontSize: 18, fontWeight: 700, color: "#6C63FF" }}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => { setShowEndModal(false); navigate("dashboard"); }} style={{ flex: 1, background: "transparent", border: "1px solid #2A2F42", color: "#E8EAF0", borderRadius: 8, padding: "10px", fontSize: 13 }}>Dashboard</button>
              <button onClick={() => { setShowEndModal(false); setQIndex(0); setCode(QUESTIONS[0].starterCode); setTestResult(null); }} style={{ flex: 1, background: "#6C63FF", border: "none", color: "#fff", borderRadius: 8, padding: "10px", fontSize: 13, fontWeight: 500 }}>Try Again</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}