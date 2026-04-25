import { useState } from "react";

const SAMPLE_FEEDBACK = {
  score: 74,
  sections: [
    { name: "Contact Info", score: 95, status: "good", notes: "All essential fields present." },
    { name: "Summary", score: 60, status: "warn", notes: "Too generic — tailor it to the target role." },
    { name: "Experience", score: 80, status: "good", notes: "Good use of action verbs. Add more quantified results." },
    { name: "Skills", score: 70, status: "warn", notes: "Missing trending skills for your target role (Docker, CI/CD)." },
    { name: "Education", score: 90, status: "good", notes: "Clearly formatted with CGPA mentioned." },
    { name: "Projects", score: 65, status: "warn", notes: "Links to projects are missing. Add GitHub URLs." },
  ],
  missing_keywords: ["Docker", "CI/CD", "REST API", "Agile", "Unit Testing"],
  found_keywords: ["React", "Node.js", "Python", "SQL", "Git"],
  suggestions: [
    "Add quantifiable achievements — e.g. 'Reduced load time by 40%'",
    "Include a link to your GitHub profile at the top",
    "Use consistent bullet point format throughout",
    "Remove 'References available on request' — implied and wastes space",
    "Add your LinkedIn URL to contact info",
  ],
};

export default function ResumeAnalyzer({ navigate }) {
  const [file, setFile] = useState(null);
  const [jd, setJd] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [dragging, setDragging] = useState(false);

  const analyze = () => {
    setAnalyzing(true);
    setTimeout(() => { setResult(SAMPLE_FEEDBACK); setAnalyzing(false); }, 2000);
  };

  const scoreColor = s => s >= 80 ? "#00D4AA" : s >= 60 ? "#FBBF24" : "#F06595";
  const statusIcon = s => s === "good" ? "✓" : "⚠";
  const statusColor = s => s === "good" ? "#00D4AA" : "#FBBF24";

  return (
    <div className="fade-in" style={{ padding: "20px 24px" }}>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontFamily: "var(--fh)", fontSize: 20, fontWeight: 700, marginBottom: 4 }}>Resume Analyzer</h2>
        <p style={{ fontSize: 12, color: "#7B8099" }}>AI-powered resume review matched against job descriptions</p>
      </div>

      {!result ? (
        <>
          {/* Upload */}
          <div
            onDragOver={e => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={e => { e.preventDefault(); setDragging(false); setFile(e.dataTransfer.files[0]); }}
            style={{ border: `2px dashed ${dragging ? "#6C63FF" : file ? "#00D4AA" : "#2A2F42"}`, borderRadius: 10, padding: "32px 20px", textAlign: "center", background: dragging ? "#1E1A40" : "#1A1E2B", marginBottom: 16, cursor: "pointer", transition: "all 0.2s" }}
            onClick={() => document.getElementById("file-inp").click()}>
            <input id="file-inp" type="file" accept=".pdf,.doc,.docx" style={{ display: "none" }} onChange={e => setFile(e.target.files[0])} />
            <div style={{ fontSize: 28, marginBottom: 10 }}>{file ? "📄" : "⬆️"}</div>
            {file ? (
              <>
                <div style={{ fontSize: 13, fontWeight: 500, color: "#00D4AA" }}>{file.name}</div>
                <div style={{ fontSize: 11, color: "#7B8099", marginTop: 4 }}>Click to change file</div>
              </>
            ) : (
              <>
                <div style={{ fontSize: 13, fontWeight: 500, color: "#E8EAF0", marginBottom: 4 }}>Drop your resume here</div>
                <div style={{ fontSize: 11, color: "#7B8099" }}>PDF, DOC, DOCX supported · Max 5MB</div>
              </>
            )}
          </div>

          {/* JD input */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 12, color: "#7B8099", marginBottom: 8 }}>Paste Job Description <span style={{ color: "#4A5068" }}>(optional — improves keyword matching)</span></div>
            <textarea
              value={jd}
              onChange={e => setJd(e.target.value)}
              placeholder="Paste the job description here..."
              rows={5}
              style={{ width: "100%", background: "#1A1E2B", border: "1px solid #2A2F42", borderRadius: 8, padding: "12px 14px", fontSize: 12, color: "#E8EAF0", outline: "none", resize: "vertical", lineHeight: 1.7 }}
            />
          </div>

          <button
            onClick={file ? analyze : () => { setFile({ name: "sample_resume.pdf" }); setTimeout(analyze, 100); }}
            style={{ width: "100%", background: "#6C63FF", border: "none", color: "#fff", borderRadius: 8, padding: 13, fontSize: 13, fontWeight: 500 }}>
            {analyzing ? (
              <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                <span style={{ width: 14, height: 14, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block", animation: "spin 0.7s linear infinite" }} />
                Analyzing Resume...
              </span>
            ) : file ? "Analyze Resume ↗" : "Try with Sample Resume ↗"}
          </button>
        </>
      ) : (
        <div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <button onClick={() => setResult(null)} style={{ background: "transparent", border: "none", color: "#7B8099", fontSize: 12, padding: 0 }}>← Re-upload</button>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 10, color: "#7B8099" }}>ATS Score</div>
                <div style={{ fontFamily: "var(--fh)", fontSize: 24, fontWeight: 700, color: scoreColor(result.score) }}>{result.score}/100</div>
              </div>
              <div style={{ width: 52, height: 52, borderRadius: "50%", border: `3px solid ${scoreColor(result.score)}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>
                {result.score >= 80 ? "🎯" : result.score >= 60 ? "⚡" : "📋"}
              </div>
            </div>
          </div>

          {/* Section scores */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 11, color: "#7B8099", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 10 }}>Section Analysis</div>
            {result.sections.map(s => (
              <div key={s.name} style={{ display: "flex", alignItems: "center", gap: 12, padding: "9px 0", borderBottom: "1px solid #2A2F42" }}>
                <span style={{ color: statusColor(s.status), fontSize: 12, flexShrink: 0 }}>{statusIcon(s.status)}</span>
                <span style={{ fontSize: 12, color: "#E8EAF0", width: 100, flexShrink: 0 }}>{s.name}</span>
                <div style={{ flex: 1, height: 4, background: "#2A2F42", borderRadius: 2, overflow: "hidden" }}>
                  <div style={{ width: `${s.score}%`, height: "100%", background: scoreColor(s.score), borderRadius: 2 }} />
                </div>
                <span style={{ fontSize: 11, color: scoreColor(s.score), width: 28, textAlign: "right" }}>{s.score}</span>
              </div>
            ))}
          </div>

          {/* Keywords */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
            <div style={{ background: "#0D2620", border: "1px solid #1D4A38", borderRadius: 8, padding: 12 }}>
              <div style={{ fontSize: 11, color: "#00D4AA", marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.8 }}>Found keywords</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                {result.found_keywords.map(k => <span key={k} style={{ fontSize: 10, background: "#173A2A", color: "#00D4AA", padding: "2px 8px", borderRadius: 4 }}>{k}</span>)}
              </div>
            </div>
            <div style={{ background: "#2A1E08", border: "1px solid #4A3810", borderRadius: 8, padding: 12 }}>
              <div style={{ fontSize: 11, color: "#FBBF24", marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.8 }}>Missing keywords</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                {result.missing_keywords.map(k => <span key={k} style={{ fontSize: 10, background: "#3A2A10", color: "#FBBF24", padding: "2px 8px", borderRadius: 4 }}>{k}</span>)}
              </div>
            </div>
          </div>

          {/* Suggestions */}
          <div>
            <div style={{ fontSize: 11, color: "#7B8099", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 10 }}>Improvement Suggestions</div>
            {result.suggestions.map((s, i) => (
              <div key={i} style={{ display: "flex", gap: 10, padding: "8px 0", borderBottom: i < result.suggestions.length - 1 ? "1px solid #2A2F42" : "none" }}>
                <span style={{ color: "#6C63FF", flexShrink: 0, fontSize: 12 }}>{i + 1}.</span>
                <span style={{ fontSize: 12, color: "#7B8099", lineHeight: 1.6 }}>{s}</span>
              </div>
            ))}
          </div>

          <button style={{ width: "100%", marginTop: 16, background: "#6C63FF", border: "none", color: "#fff", borderRadius: 8, padding: 12, fontSize: 13, fontWeight: 500 }}>
            Download Full Report ↗
          </button>
        </div>
      )}
    </div>
  );
}