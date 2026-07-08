import React, { useState, useMemo, useRef } from "react";
import "./CodingArena.css";

// ---------- Static data (swap for API data later) ----------
const CATEGORIES = [
  { name: "Arrays", count: 142 },
  { name: "Strings", count: 98 },
  { name: "Recursion", count: 54 },
  { name: "Linked List", count: 61 },
  { name: "Trees", count: 87 },
  { name: "Graphs", count: 73 },
  { name: "Dynamic Programming", count: 120 },
];

const PROBLEMS = [
  {
    id: 1,
    name: "Reverse a String",
    difficulty: "Easy",
    xp: 20,
    done: true,
    time: "8 min",
    acceptance: "78.4%",
    solvedBy: "184K",
    tags: ["Strings", "Two Pointers", "In-place"],
    statement:
      "Write a function that reverses a string in place. The input string is given as an array of characters `s`. You must modify the array without allocating extra space for another array — use O(1) additional memory.",
    example: 'Input: s = ["h","e","l","l","o"]\nOutput: ["o","l","l","e","h"]',
    explanation:
      "Use a two-pointer technique — one starting at the beginning and one at the end — swapping characters and moving both pointers toward the center until they meet.",
    constraints: [
      "1 ≤ s.length ≤ 10⁵",
      "s[i] is a printable ASCII character",
      "Edge case: empty array and single-character arrays should return unchanged",
    ],
    starterCode: `// Reverse the array in place — O(1) extra space
function reverseString(s) {
  let left = 0, right = s.length - 1;
  while (left < right) {
    [s[left], s[right]] = [s[right], s[left]];
    left++; right--;
  }
  return s;
}`,
    tests: [
      { input: '["h","e","l","l","o"]', expected: '["o","l","l","e","h"]' },
      { input: '["H","a","n","n","a","h"]', expected: '["h","a","n","n","a","H"]' },
    ],
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
  },
  { id: 2, name: "Two Sum", difficulty: "Easy", xp: 15, done: false },
  { id: 3, name: "Longest Substring", difficulty: "Medium", xp: 35, done: false },
  { id: 4, name: "Merge K Sorted Lists", difficulty: "Hard", xp: 60, done: false },
  { id: 5, name: "Binary Tree Zigzag", difficulty: "Medium", xp: 30, done: true },
  { id: 6, name: "Course Schedule", difficulty: "Hard", xp: 55, done: false },
];

const TABS = ["Description", "Examples", "Constraints", "Hints", "Companies", "Discussion"];

const AI_ACTIONS = [
  { key: "explain", label: "Explain Problem", reply: "This problem asks you to reverse an array of characters in place using O(1) extra space — think two pointers closing in from both ends." },
  { key: "hint", label: "Give Hint", reply: "Hint: you don't need a new array. Swap the first and last elements, then move both pointers inward." },
  { key: "debug", label: "Debug Code", reply: "Your code looks correct. Double check the loop condition — it should stop once left is no longer less than right." },
  { key: "optimize", label: "Optimize Code", reply: "Your solution is already optimal: O(n) time and O(1) space. No further optimization needed." },
  { key: "tests", label: "Generate Test Cases", reply: "Try: empty array [], single char [\"a\"], and a palindrome [\"a\",\"b\",\"a\"] to check edge cases." },
  { key: "complexity", label: "Explain Complexity", reply: "Time: O(n) — each element is visited once. Space: O(1) — swaps happen in place with no extra structures." },
];

const badgeClass = (difficulty) => `ca-badge ca-badge--${difficulty.toLowerCase()}`;

export default function CodingArena() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDifficulty, setActiveDifficulty] = useState("Easy");
  const [activeCategory, setActiveCategory] = useState("Arrays");
  const [selectedId, setSelectedId] = useState(1);
  const [favorites, setFavorites] = useState({ 1: true });
  const [activeTab, setActiveTab] = useState("Description");
  const [isDark, setIsDark] = useState(false);
  const [language, setLanguage] = useState("JavaScript");

  const selected = useMemo(
    () => PROBLEMS.find((p) => p.id === selectedId) || PROBLEMS[0],
    [selectedId]
  );

  const [code, setCode] = useState(selected.starterCode || "// Select a problem to load starter code");
  const [testResults, setTestResults] = useState(
    (selected.tests || []).map((t) => ({ ...t, status: "idle" }))
  );
  const [consoleLines, setConsoleLines] = useState([
    "Ready. Click “Run Code” to execute your solution against the test cases.",
  ]);
  const [metrics, setMetrics] = useState({ runtime: "—", memory: "—", percentile: "—" });
  const [isRunning, setIsRunning] = useState(false);
  const [toast, setToast] = useState("");
  const [notes, setNotes] = useState(
    "## Approach\nTwo-pointer swap from both ends, O(1) space, O(n) time."
  );
  const [aiReply, setAiReply] = useState(null);
  const [xp, setXp] = useState(6120);
  const [levelProgress, setLevelProgress] = useState(68);
  const toastTimer = useRef(null);

  const filteredProblems = PROBLEMS.filter((p) => {
    const matchesDifficulty = !activeDifficulty || p.difficulty === activeDifficulty;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDifficulty && matchesSearch;
  });

  function selectProblem(problem) {
    setSelectedId(problem.id);
    setCode(problem.starterCode || "// No starter code available for this problem yet");
    setTestResults((problem.tests || []).map((t) => ({ ...t, status: "idle" })));
    setConsoleLines(["Ready. Click “Run Code” to execute your solution against the test cases."]);
    setMetrics({ runtime: "—", memory: "—", percentile: "—" });
    setActiveTab("Description");
    setAiReply(null);
  }

  function toggleFavorite(id) {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function showToast(message) {
    setToast(message);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 2400);
  }

  function runCode() {
    if (!selected.tests) return;
    setIsRunning(true);
    setConsoleLines(["Running your solution against all test cases…"]);
    setTimeout(() => {
      const runtime = `${(Math.random() * 60 + 30).toFixed(0)} ms`;
      const memory = `${(Math.random() * 4 + 40).toFixed(1)} MB`;
      const percentile = `${(Math.random() * 15 + 80).toFixed(0)}%`;
      setTestResults((prev) => prev.map((t) => ({ ...t, status: "pass" })));
      setMetrics({ runtime, memory, percentile });
      setConsoleLines([
        `✅ All ${selected.tests.length} test cases passed`,
        "→ Execution finished with exit code 0",
      ]);
      setIsRunning(false);
    }, 900);
  }

  function submitSolution() {
    setConsoleLines(["🚀 Submitting solution…"]);
    setTimeout(() => {
      setConsoleLines(["🎉 Accepted — all test cases passed. XP awarded!"]);
      setXp((prev) => prev + selected.xp);
      setLevelProgress((prev) => Math.min(100, prev + 8));
      showToast(`+${selected.xp} XP awarded`);
    }, 900);
  }

  function saveDraft() {
    showToast("Draft saved");
  }

  function resetCode() {
    setCode(selected.starterCode || "");
    setConsoleLines(["Code reset to starter template."]);
    setTestResults((selected.tests || []).map((t) => ({ ...t, status: "idle" })));
    setMetrics({ runtime: "—", memory: "—", percentile: "—" });
  }

  function runAiAction(action) {
    setAiReply(action);
  }

  return (
    <div className={`coding-arena ${isDark ? "ca-dark" : ""}`}>
      {/* HEADER */}
      <div className="ca-header">
        <div className="ca-brand">
          <div className="ca-brand-mark">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M8 6L2 12L8 18M16 6L22 12L16 18" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="ca-brand-text">
            Coding <span>Arena</span>
          </div>
        </div>

        <div className="ca-search-wrap">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3" />
          </svg>
          <input
            type="text"
            placeholder="Search problems, topics, companies…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span className="ca-kbd">⌘K</span>
        </div>

        <div className="ca-header-spacer" />

        <div className="ca-header-actions">
          <select
            className="ca-lang-select"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option>JavaScript</option>
            <option>Python</option>
            <option>Java</option>
            <option>C++</option>
          </select>

          <button className="ca-icon-btn" title="Toggle theme" onClick={() => setIsDark((d) => !d)}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12.8A9 9 0 1111.2 3 7 7 0 0021 12.8z" />
            </svg>
          </button>

          <button className="ca-icon-btn" title="Notifications">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.7 21a2 2 0 01-3.4 0" />
            </svg>
            <span className="ca-dot-badge" />
          </button>

          <div className="ca-avatar">RK</div>
        </div>
      </div>

      {/* BODY */}
      <div className="ca-body-grid">
        {/* LEFT SIDEBAR */}
        <div className="ca-panel ca-left-sidebar">
          <div className="ca-side-search">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.3-4.3" />
            </svg>
            <input
              placeholder="Filter problems"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="ca-diff-row">
            {["Easy", "Medium", "Hard"].map((d) => (
              <div
                key={d}
                className={`ca-diff-chip ca-diff-chip--${d.toLowerCase()} ${
                  activeDifficulty === d ? "ca-active" : ""
                }`}
                onClick={() => setActiveDifficulty(activeDifficulty === d ? null : d)}
              >
                {d}
              </div>
            ))}
          </div>

          <div>
            <div className="ca-side-label">Categories</div>
            <div className="ca-cat-list">
              {CATEGORIES.map((c) => (
                <div
                  key={c.name}
                  className={`ca-cat-item ${activeCategory === c.name ? "ca-active" : ""}`}
                  onClick={() => setActiveCategory(c.name)}
                >
                  <span>{c.name}</span>
                  <span className="ca-cat-count">{c.count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="ca-side-label">Problems</div>
          <div className="ca-problem-list">
            {filteredProblems.map((p) => (
              <div
                key={p.id}
                className={`ca-p-card ${selectedId === p.id ? "ca-active" : ""}`}
                onClick={() => selectProblem(p)}
              >
                <div className="ca-p-card-top">
                  <div className="ca-p-name">{p.name}</div>
                  <svg
                    className={`ca-p-fav ${favorites[p.id] ? "ca-on" : ""}`}
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill={favorites[p.id] ? "currentColor" : "none"}
                    stroke="currentColor"
                    strokeWidth="1.8"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(p.id);
                    }}
                  >
                    <path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.9L12 17.8 5.8 21l1.2-6.9-5-4.9 6.9-1z" />
                  </svg>
                </div>
                <div className="ca-p-meta">
                  <span className={badgeClass(p.difficulty)}>{p.difficulty.toUpperCase()}</span>
                  <span className="ca-xp-tag">⚡ {p.xp} XP</span>
                  <span className={`ca-status-dot ${p.done ? "ca-done" : "ca-pending"}`}>
                    {p.done && (
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    )}
                  </span>
                </div>
              </div>
            ))}
            {filteredProblems.length === 0 && (
              <div className="ca-empty-list">No problems match this filter.</div>
            )}
          </div>
        </div>

        {/* CENTER WORKSPACE */}
        <div className="ca-center-col">
          <div className="ca-problem-header">
            <div className="ca-ph-top">
              <div className="ca-ph-title">
                {selected.name}
                <span className={badgeClass(selected.difficulty)}>{selected.difficulty.toUpperCase()}</span>
              </div>
              <div className="ca-ph-actions">
                <div className="ca-ghost-btn" onClick={() => toggleFavorite(selected.id)}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill={favorites[selected.id] ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                    <path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.9L12 17.8 5.8 21l1.2-6.9-5-4.9 6.9-1z" />
                  </svg>
                  Favorite
                </div>
                <div className="ca-ghost-btn" onClick={() => showToast("Link copied to clipboard")}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="18" cy="5" r="3" />
                    <circle cx="6" cy="12" r="3" />
                    <circle cx="18" cy="19" r="3" />
                    <path d="M8.6 13.5l6.8 3.9M15.4 6.6L8.6 10.5" />
                  </svg>
                  Share
                </div>
              </div>
            </div>

            <div className="ca-ph-stats">
              <div className="ca-ph-stat">
                <span className="ca-ph-stat-label">XP Reward</span>
                <span className="ca-ph-stat-value">⚡ {selected.xp} XP</span>
              </div>
              <div className="ca-ph-stat">
                <span className="ca-ph-stat-label">Est. Time</span>
                <span className="ca-ph-stat-value">🕒 {selected.time || "—"}</span>
              </div>
              <div className="ca-ph-stat">
                <span className="ca-ph-stat-label">Acceptance</span>
                <span className="ca-ph-stat-value">{selected.acceptance || "—"}</span>
              </div>
              <div className="ca-ph-stat">
                <span className="ca-ph-stat-label">Solved by</span>
                <span className="ca-ph-stat-value">{selected.solvedBy ? `${selected.solvedBy} devs` : "—"}</span>
              </div>
            </div>

            <div className="ca-ph-tags">
              {(selected.tags || []).map((t) => (
                <span className="ca-tag-pill" key={t}>{t}</span>
              ))}
            </div>

            <div className="ca-tabs-row">
              {TABS.map((tab) => (
                <div
                  key={tab}
                  className={`ca-tab ${activeTab === tab ? "ca-active" : ""}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </div>
              ))}
            </div>
          </div>

          <div className="ca-desc-card">
            {activeTab === "Description" && selected.statement && (
              <>
                <h4>Problem Statement</h4>
                <p>{selected.statement}</p>
                <div className="ca-code-chunk">{selected.example}</div>
                <h4 style={{ marginTop: 14 }}>Explanation</h4>
                <p>{selected.explanation}</p>
              </>
            )}

            {activeTab === "Constraints" && selected.constraints && (
              <>
                <h4>Constraints</h4>
                <ul>
                  {selected.constraints.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </>
            )}

            {activeTab === "Examples" && (
              <>
                <h4>Examples</h4>
                <div className="ca-code-chunk">{selected.example || "No examples for this problem yet."}</div>
              </>
            )}

            {activeTab === "Hints" && (
              <>
                <h4>Hints</h4>
                <p>Try the two-pointer approach: swap elements from both ends and move inward.</p>
              </>
            )}

            {activeTab === "Companies" && (
              <>
                <h4>Asked by</h4>
                <div className="ca-ph-tags">
                  <span className="ca-tag-pill">Google</span>
                  <span className="ca-tag-pill">Amazon</span>
                  <span className="ca-tag-pill">Meta</span>
                </div>
              </>
            )}

            {activeTab === "Discussion" && (
              <>
                <h4>Discussion</h4>
                <p>No comments yet — be the first to share your approach with the community.</p>
              </>
            )}

            {!selected.statement && activeTab === "Description" && (
              <p>Full write-up for this problem is coming soon. Try the starter code in the editor below.</p>
            )}
          </div>

          {/* EDITOR */}
          <div className="ca-editor-card">
            <div className="ca-editor-topbar">
              <div className="ca-win-dots">
                <span /><span /><span />
              </div>
              <div className="ca-editor-file">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                  <path d="M14 2v6h6" />
                </svg>
                solution.js
                <span className="ca-save-status"><span className="ca-pip" />Saved</span>
              </div>
              <div className="ca-editor-tools">
                <span className="ca-lang-pill-dark">{language}</span>
                <div className="ca-e-icon" title="Copy" onClick={() => { navigator.clipboard?.writeText(code); showToast("Code copied"); }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" />
                    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                  </svg>
                </div>
                <div className="ca-e-icon" title="Reset" onClick={resetCode}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 12a9 9 0 109-9 9.75 9.75 0 00-6.74 2.74L3 8" />
                    <path d="M3 3v5h5" />
                  </svg>
                </div>
                <div className="ca-e-icon" title="Clear" onClick={() => setCode("")}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6z" />
                  </svg>
                </div>
              </div>
            </div>

            <textarea
              className="ca-code-editor"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck={false}
              placeholder="// Write your solution here"
            />

            <div className="ca-test-console-grid">
              <div className="ca-test-panel">
                <div className="ca-tc-title">
                  Test Cases
                  <span className="ca-run-mini" onClick={runCode}>
                    {isRunning ? "Running…" : "▶ Run Test"}
                  </span>
                </div>
                {testResults.length === 0 && (
                  <div className="ca-empty-list">No test cases for this problem yet.</div>
                )}
                {testResults.map((t, i) => (
                  <div key={i} className={`ca-tc-case ${t.status === "pass" ? "ca-pass" : ""}`}>
                    {t.status === "pass" && <span className="ca-tc-status ca-pass">PASSED</span>}
                    <div className="ca-tc-row-label">Input</div>
                    <div className="ca-tc-row-val">{t.input}</div>
                    <div className="ca-tc-row-label" style={{ marginTop: 5 }}>Expected Output</div>
                    <div className="ca-tc-row-val">{t.expected}</div>
                  </div>
                ))}
              </div>
              <div className="ca-console-panel">
                <div className="ca-tc-title">Output Console</div>
                {consoleLines.map((line, i) => (
                  <div className="ca-console-line" key={i}>{line}</div>
                ))}
                <div className="ca-console-metrics">
                  <div className="ca-metric-pill">
                    <div className="ca-m-label">Runtime</div>
                    <div className="ca-m-value">{metrics.runtime}</div>
                  </div>
                  <div className="ca-metric-pill">
                    <div className="ca-m-label">Memory</div>
                    <div className="ca-m-value">{metrics.memory}</div>
                  </div>
                  <div className="ca-metric-pill">
                    <div className="ca-m-label">Percentile</div>
                    <div className="ca-m-value">{metrics.percentile}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ACTION BAR */}
          <div className="ca-action-bar">
            <button className="ca-action-btn ca-run" onClick={runCode} disabled={isRunning}>
              ▶ {isRunning ? "Running…" : "Run Code"}
            </button>
            <button className="ca-action-btn ca-submit" onClick={submitSolution}>⬆ Submit Solution</button>
            <button className="ca-action-btn ca-draft" onClick={saveDraft}>💾 Save Draft</button>
            <button className="ca-action-btn ca-reset" onClick={resetCode}>↺ Reset</button>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="ca-panel ca-right-sidebar">
          <div className="ca-r-block">
            <div className="ca-r-block-title"><span className="ca-dotp" />AI Mentor</div>
            <div className="ca-ai-btn-grid">
              {AI_ACTIONS.map((a) => (
                <div className="ca-ai-btn" key={a.key} onClick={() => runAiAction(a)}>
                  <span>{a.label}</span>
                </div>
              ))}
            </div>
            {aiReply && (
              <div className="ca-suggestion-box" style={{ marginTop: 10 }}>
                <strong>{aiReply.label}:</strong> {aiReply.reply}
              </div>
            )}
          </div>

          <div className="ca-r-block">
            <div className="ca-r-block-title"><span className="ca-dotp" />Complexity Analysis</div>
            <div className="ca-complexity-row">
              <span className="ca-cx-label">Time Complexity</span>
              <span className="ca-cx-value">{selected.timeComplexity || "—"}</span>
            </div>
            <div className="ca-complexity-row">
              <span className="ca-cx-label">Space Complexity</span>
              <span className="ca-cx-value">{selected.spaceComplexity || "—"}</span>
            </div>
            <div className="ca-suggestion-box">
              💡 Your two-pointer swap is optimal — matches the ideal in-place bound for this problem.
            </div>
          </div>

          <div className="ca-r-block">
            <div className="ca-r-block-title"><span className="ca-dotp" />Learning Progress</div>
            <div className="ca-prog-stats-grid">
              <div className="ca-prog-stat">
                <div className="ca-val">{PROBLEMS.filter((p) => p.done).length}</div>
                <div className="ca-lbl">Solved</div>
              </div>
              <div className="ca-prog-stat">
                <div className="ca-val">{xp.toLocaleString()}</div>
                <div className="ca-lbl">XP Points</div>
              </div>
            </div>
            <div className="ca-level-row">
              <span style={{ fontSize: 11.5, color: "var(--ca-ink-500)" }}>Level Progress</span>
              <span className="ca-level-tag">Lv. 14</span>
            </div>
            <div className="ca-progress-track">
              <div className="ca-progress-fill" style={{ width: `${levelProgress}%` }} />
            </div>
            <div className="ca-progress-caption">{100 - levelProgress}% to Level 15</div>
          </div>

          <div className="ca-r-block">
            <div className="ca-r-block-title"><span className="ca-dotp" />Achievements</div>
            <div className="ca-badges-row">
              <div className="ca-badge-circle">🏆</div>
              <div className="ca-badge-circle ca-two">⚡</div>
              <div className="ca-badge-circle ca-three">🎯</div>
            </div>
            <div className="ca-rank-row"><span>Global Rank</span><b>#1,204</b></div>
            <div className="ca-rank-row"><span>Current Streak</span><span className="ca-streak-flame">🔥 12 days</span></div>
          </div>

          <div className="ca-r-block">
            <div className="ca-r-block-title"><span className="ca-dotp" />Notes</div>
            <textarea
              className="ca-notes-area"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="## Approach&#10;Two-pointer swap, O(1) space..."
            />
            <div className="ca-notes-save" onClick={() => showToast("Notes saved")}>Save Notes</div>
          </div>
        </div>
      </div>

      {toast && <div className="ca-toast">{toast}</div>}
    </div>
  );
}