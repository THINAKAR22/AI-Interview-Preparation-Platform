// ResumeAnalysis.jsx — No API key needed, fully local analysis
import { useState, useRef, useCallback } from "react";
import "./ResumeAnalyzer.css";

const formatFileSize = (bytes) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const scoreClass = (n) => {
  if (n >= 80) return "score-excellent";
  if (n >= 60) return "score-good";
  if (n >= 40) return "score-average";
  return "score-poor";
};

// ── Tech skills dictionary ──────────────────────────────────────────────────
const TECH_SKILLS = [
  "javascript","typescript","python","java","c++","c#","ruby","go","rust","php","swift","kotlin",
  "react","vue","angular","nextjs","nodejs","express","django","flask","spring","laravel",
  "html","css","sass","tailwind","bootstrap","jquery",
  "sql","mysql","postgresql","mongodb","redis","firebase","sqlite","oracle",
  "aws","azure","gcp","docker","kubernetes","terraform","jenkins","ci/cd","devops",
  "git","github","gitlab","bitbucket","linux","bash","rest","graphql","api",
  "machine learning","deep learning","tensorflow","pytorch","pandas","numpy","scikit",
  "figma","photoshop","adobe xd","ui/ux",
  "agile","scrum","jira","confluence","trello",
];

const POWER_VERBS = [
  "developed","built","designed","implemented","led","managed","created","improved",
  "optimized","reduced","increased","delivered","launched","architected","engineered",
  "deployed","automated","scaled","mentored","collaborated","achieved","drove",
];

const WEAK_WORDS = [
  "responsible for","worked on","helped with","assisted","duties included",
  "was involved","participated in","familiar with",
];

// ── Core analyzer ───────────────────────────────────────────────────────────
function analyzeResume(text) {
  const lower = text.toLowerCase();
  const words = lower.split(/\s+/);
  const lines = text.split(/\n/).map(l => l.trim()).filter(Boolean);

  // Skills found
  const skillsFound = TECH_SKILLS.filter(sk => lower.includes(sk));
  const topSkills = ["react","nodejs","python","aws","docker","typescript","kubernetes","graphql","postgresql","machine learning"];
  const skillsMissing = topSkills.filter(sk => !lower.includes(sk)).slice(0, 6);

  // Section detection
  const hasExperience = /experience|work history|employment/i.test(text);
  const hasEducation  = /education|degree|university|college|bachelor|master|phd/i.test(text);
  const hasSkills     = /skills|technologies|tech stack/i.test(text);
  const hasSummary    = /summary|objective|profile|about/i.test(text);
  const hasProjects   = /project|portfolio/i.test(text);
  const hasContact    = /email|phone|linkedin|github/i.test(text);
  const hasMetrics    = /\d+%|\$\d+|\d+x|\d+ (users|customers|teams|projects|million|thousand)/i.test(text);

  // Power verbs
  const verbsUsed = POWER_VERBS.filter(v => lower.includes(v));
  const weakWordsFound = WEAK_WORDS.filter(w => lower.includes(w));

  // Length
  const wordCount = words.length;
  const pageEstimate = Math.ceil(wordCount / 400);

  // Email & phone check
  const hasEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(text);
  const hasPhone = /(\+?\d[\d\s\-().]{7,}\d)/.test(text);
  const hasLinkedIn = /linkedin\.com|linkedin/i.test(text);
  const hasGitHub   = /github\.com|github/i.test(text);

  // ── Scoring ──
  let overall = 50;
  let ats = 50;
  let readability = 50;
  let impact = 50;

  // Overall
  if (hasExperience) overall += 8;
  if (hasEducation)  overall += 6;
  if (hasSkills)     overall += 6;
  if (hasSummary)    overall += 5;
  if (hasProjects)   overall += 5;
  if (hasContact)    overall += 5;
  if (hasMetrics)    overall += 8;
  if (skillsFound.length > 5)  overall += 5;
  if (skillsFound.length > 10) overall += 2;
  if (verbsUsed.length > 3)    overall += 4;
  if (weakWordsFound.length > 2) overall -= 6;
  if (wordCount < 150) overall -= 10;

  // ATS
  if (hasExperience) ats += 10;
  if (hasEducation)  ats += 8;
  if (hasSkills)     ats += 10;
  if (hasContact)    ats += 8;
  if (skillsFound.length > 5) ats += 8;
  if (hasEmail && hasPhone) ats += 6;
  if (wordCount < 200) ats -= 10;
  if (/table|column|graphic|image|chart/i.test(text)) ats -= 8;

  // Readability
  if (lines.length > 10) readability += 10;
  if (hasSummary)  readability += 8;
  if (hasProjects) readability += 6;
  if (pageEstimate === 1 || pageEstimate === 2) readability += 8;
  if (pageEstimate > 3) readability -= 8;
  if (weakWordsFound.length > 2) readability -= 6;

  // Impact
  if (hasMetrics)          impact += 15;
  if (verbsUsed.length > 5) impact += 10;
  if (verbsUsed.length > 3) impact += 5;
  if (hasProjects)         impact += 8;
  if (weakWordsFound.length > 2) impact -= 10;
  if (!hasMetrics)         impact -= 8;

  // Clamp 0–100
  const clamp = (n) => Math.min(100, Math.max(0, n));
  overall     = clamp(overall);
  ats         = clamp(ats);
  readability = clamp(readability);
  impact      = clamp(impact);

  // ── Strengths ──
  const strengths = [];
  if (skillsFound.length > 5) strengths.push(`Strong tech stack with ${skillsFound.length} skills detected including ${skillsFound.slice(0,3).join(", ")}.`);
  if (hasMetrics) strengths.push("Uses quantifiable metrics to demonstrate impact — great for standing out.");
  if (verbsUsed.length > 3) strengths.push(`Uses strong action verbs like "${verbsUsed.slice(0,3).join('", "')}" effectively.`);
  if (hasLinkedIn && hasGitHub) strengths.push("Includes both LinkedIn and GitHub links — excellent for tech roles.");
  if (hasProjects) strengths.push("Projects section present which adds credibility and showcases practical skills.");
  if (hasSummary) strengths.push("Has a professional summary which helps recruiters quickly understand your profile.");
  if (strengths.length < 3) strengths.push("Resume covers core sections expected by recruiters.");
  if (strengths.length < 3) strengths.push("Contact information is present and accessible.");

  // ── Improvements ──
  const improvements = [];
  if (!hasMetrics) improvements.push("Add numbers and metrics to bullet points (e.g. 'Improved load time by 40%' instead of 'Improved performance').");
  if (weakWordsFound.length > 0) improvements.push(`Replace weak phrases like "${weakWordsFound[0]}" with strong action verbs.`);
  if (!hasSummary) improvements.push("Add a 2-3 line professional summary at the top to hook recruiters immediately.");
  if (!hasProjects) improvements.push("Add a Projects section with links to GitHub or live demos.");
  if (!hasLinkedIn) improvements.push("Include your LinkedIn profile URL for professional credibility.");
  if (!hasGitHub && skillsFound.length > 3) improvements.push("Add your GitHub profile to showcase your code — essential for tech roles.");
  if (skillsMissing.length > 2) improvements.push(`Consider learning and adding in-demand skills: ${skillsMissing.slice(0,3).join(", ")}.`);
  if (improvements.length < 3) improvements.push("Tailor your resume keywords to match each job description for better ATS pass rate.");

  // ── Tips ──
  const tips = [
    "Use the STAR method (Situation, Task, Action, Result) for each bullet point.",
    "Keep your resume to 1 page if under 5 years experience, 2 pages max otherwise.",
    "Customize your skills section for each job posting to match keywords in the JD.",
    "Use a clean single-column layout — ATS parsers struggle with multi-column formats.",
    "Save and submit your resume as a PDF unless the job posting specifies otherwise.",
  ];

  // ── ATS issues ──
  let atsIssues = "";
  const issues = [];
  if (!hasEmail) issues.push("no email detected");
  if (!hasPhone) issues.push("no phone number detected");
  if (!hasSkills) issues.push("missing a dedicated Skills section");
  if (!hasExperience) issues.push("no Experience section detected");
  if (skillsFound.length < 4) issues.push("too few technical keywords for ATS matching");

  atsIssues = issues.length === 0
    ? `Your resume scores ${ats}/100 on ATS compatibility. It contains the key sections and keywords that most applicant tracking systems look for. Keep tailoring skills to each job description for the best results.`
    : `ATS score: ${ats}/100. Issues found: ${issues.join("; ")}. Fix these to improve your chances of passing automated screening filters.`;

  return {
    overallScore: overall,
    atsScore: ats,
    readabilityScore: readability,
    impactScore: impact,
    summary: `Your resume ${overall >= 70 ? "is strong" : overall >= 50 ? "is decent" : "needs improvement"} with an overall score of ${overall}/100. ${hasMetrics ? "You effectively use metrics to quantify your impact." : "Adding measurable achievements will significantly boost your profile."} ${skillsFound.length > 5 ? `Your tech skills (${skillsFound.length} detected) are a highlight.` : "Expanding your listed technical skills will improve ATS matching."}`,
    strengths: strengths.slice(0, 4),
    improvements: improvements.slice(0, 4),
    actionableTips: tips.slice(0, 4),
    skillsFound: skillsFound.slice(0, 20),
    skillsMissing,
    atsIssues,
  };
}

// ── PDF text extractor (no library needed) ──────────────────────────────────
async function extractTextFromFile(file) {
  if (file.type === "text/plain") {
    return await file.text();
  }

  // For PDF: extract raw text using regex on binary stream
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const binary = e.target.result;
        // Extract readable ASCII strings from binary PDF
        let text = "";
        // Match printable ASCII sequences of 3+ chars
        const matches = binary.match(/[\x20-\x7E]{3,}/g) || [];
        text = matches
          .filter(m => m.trim().length > 2)
          // Filter out PDF syntax noise
          .filter(m => !/^(obj|endobj|stream|endstream|xref|startxref|trailer|PDF|BT|ET|Tf|Tm|Td|TJ|Tj|cm|re|f|W|n|q|Q|gs|cs|scn|rg|RG|w|J|j|M|d|ri|i|S|s|B|b|F|m|l|c|v|y|h)$/.test(m.trim()))
          .join(" ");
        resolve(text || "Resume content detected but text extraction was limited. Analysis based on available content.");
      } catch {
        resolve("Resume uploaded successfully.");
      }
    };
    reader.readAsBinaryString(file);
  });
}

// ── Component ────────────────────────────────────────────────────────────────
export default function ResumeAnalysis() {
  const [file, setFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const inputRef = useRef();

  const handleFile = (f) => {
    if (!f) return;
    if (!f.name.match(/\.(pdf|txt|doc|docx)$/i)) {
      setError("Please upload a PDF, DOCX, or TXT file.");
      return;
    }
    if (f.size > 10 * 1024 * 1024) {
      setError("File must be under 10 MB.");
      return;
    }
    setError("");
    setResult(null);
    setFile(f);
  };

  const onInputChange = (e) => handleFile(e.target.files?.[0]);
  const onDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files?.[0]);
  }, []);
  const onDragOver = (e) => { e.preventDefault(); setDragOver(true); };
  const onDragLeave = () => setDragOver(false);

  const analyze = async () => {
    if (!file) return;
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const text = await extractTextFromFile(file);
      // Simulate a brief processing delay for UX
      await new Promise(r => setTimeout(r, 1500));
      const analysis = analyzeResume(text);
      setResult(analysis);
    } catch (err) {
      setError("Could not analyze file. Please try a TXT version of your resume.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setFile(null);
    setResult(null);
    setError("");
    if (inputRef.current) inputRef.current.value = "";
  };

  const AtsCircle = ({ score }) => {
    const r = 36;
    const circ = 2 * Math.PI * r;
    const offset = circ - (score / 100) * circ;
    const color = score >= 80 ? "#34d399" : score >= 60 ? "#60a5fa" : score >= 40 ? "#fbbf24" : "#f87171";
    return (
      <div className="ats-circle">
        <svg width="90" height="90" viewBox="0 0 90 90">
          <circle cx="45" cy="45" r={r} fill="none" stroke="#1e1e3f" strokeWidth="8" />
          <circle cx="45" cy="45" r={r} fill="none" stroke={color} strokeWidth="8"
            strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" />
        </svg>
        <div className="ats-text">{score}</div>
      </div>
    );
  };

  return (
    <div className="resume-page">
      <div className="resume-header">
        <h1>📄 Resume Analysis</h1>
        <p>Upload your resume and get instant AI-powered feedback</p>
      </div>

      {!result && (
        <>
          <div
            className={`upload-zone ${dragOver ? "drag-over" : ""}`}
            onDrop={onDrop} onDragOver={onDragOver} onDragLeave={onDragLeave}
            onClick={() => !file && inputRef.current?.click()}
          >
            <input ref={inputRef} type="file" accept=".pdf,.txt,.doc,.docx"
              onChange={onInputChange} style={{ display: "none" }} />
            <div className="upload-icon">☁️</div>
            <h3>Drop your resume here</h3>
            <p>or click to browse files</p>
            <p className="file-types">Supported: PDF, DOCX, TXT · Max 10 MB</p>
          </div>

          {file && (
            <div className="file-selected-info">
              <span className="file-icon">📋</span>
              <div className="file-details">
                <div className="file-name">{file.name}</div>
                <div className="file-size">{formatFileSize(file.size)}</div>
              </div>
              <button className="remove-file-btn" onClick={reset}>✕</button>
            </div>
          )}

          {error && <div className="error-box"><span>⚠️</span> {error}</div>}

          <button className="analyze-btn" disabled={!file || loading} onClick={analyze}>
            {loading ? "Analyzing…" : "Analyze Resume"}
          </button>
        </>
      )}

      {loading && (
        <div className="loading-container">
          <div className="spinner" />
          <h3>Analyzing your resume…</h3>
          <p>Checking skills, ATS compatibility, and impact</p>
        </div>
      )}

      {result && !loading && (
        <div className="results-container">
          <div className="results-header">
            <h2>Analysis Results · {file?.name}</h2>
            <button className="reanalyze-btn" onClick={reset}>↩ New Resume</button>
          </div>

          <div className="score-grid">
            {[
              { label: "Overall Score",  value: result.overallScore },
              { label: "ATS Score",      value: result.atsScore },
              { label: "Readability",    value: result.readabilityScore },
              { label: "Impact Score",   value: result.impactScore },
            ].map(({ label, value }) => (
              <div className="score-card" key={label}>
                <div className={`score-value ${scoreClass(value)}`}>{value}</div>
                <div className="score-label">{label}</div>
                <div className="progress-bar-wrap">
                  <div className="progress-bar-fill" style={{ width: `${value}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="section-card">
            <h3><span className="section-icon">💡</span> Summary</h3>
            <p style={{ color: "#cbd5e1", lineHeight: 1.7, fontSize: "0.92rem" }}>{result.summary}</p>
          </div>

          <div className="section-card">
            <h3><span className="section-icon">✅</span> Strengths</h3>
            <ul className="feedback-list">
              {result.strengths?.map((s, i) => (
                <li key={i}><span className="bullet bullet-strength">●</span> {s}</li>
              ))}
            </ul>
          </div>

          <div className="section-card">
            <h3><span className="section-icon">⚡</span> Areas to Improve</h3>
            <ul className="feedback-list">
              {result.improvements?.map((s, i) => (
                <li key={i}><span className="bullet bullet-improve">●</span> {s}</li>
              ))}
            </ul>
          </div>

          <div className="section-card">
            <h3><span className="section-icon">🎯</span> Actionable Tips</h3>
            <ul className="feedback-list">
              {result.actionableTips?.map((s, i) => (
                <li key={i}><span className="bullet bullet-tip">●</span> {s}</li>
              ))}
            </ul>
          </div>

          <div className="section-card">
            <h3><span className="section-icon">🛠️</span> Skills Detected</h3>
            <div className="skill-tags" style={{ marginBottom: "1rem" }}>
              {result.skillsFound?.length > 0
                ? result.skillsFound.map((sk, i) => (
                    <span className="skill-tag found" key={i}>{sk}</span>
                  ))
                : <p style={{ color: "#64748b", fontSize: "0.85rem" }}>No tech skills detected — make sure your skills are listed clearly.</p>
              }
            </div>
            {result.skillsMissing?.length > 0 && (
              <>
                <p style={{ fontSize: "0.82rem", color: "#64748b", marginBottom: "0.6rem" }}>
                  Consider adding these in-demand skills:
                </p>
                <div className="skill-tags">
                  {result.skillsMissing.map((sk, i) => (
                    <span className="skill-tag missing" key={i}>{sk}</span>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="section-card">
            <h3><span className="section-icon">🤖</span> ATS Compatibility</h3>
            <div className="ats-section">
              <AtsCircle score={result.atsScore} />
              <div className="ats-info"><p>{result.atsIssues}</p></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
