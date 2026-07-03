import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowRight } from "lucide-react";

/**
 * Login page for an AI interview-prep product.
 * Left: an ambient, looping mock transcript — the product listening and
 * responding — so logging in feels like stepping into a live session.
 * Right: the auth form.
 *
 * Plain CSS only (no Tailwind) — all styles live in the <style> block below
 * and are applied via ordinary class names.
 */

const TRANSCRIPT = [
  { role: "q", text: "Tell me about a time you disagreed with a teammate." },
  { role: "a", text: "I'd start by separating the disagreement from the person…" },
  { role: "q", text: "Good. Now tighten that into two sentences." },
];

function GoogleMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 01-1.8 2.72v2.26h2.9c1.7-1.56 2.7-3.86 2.7-6.62z" />
      <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.81.54-1.85.86-3.06.86-2.35 0-4.34-1.59-5.05-3.72H.96v2.33A9 9 0 009 18z" />
      <path fill="#FBBC05" d="M3.95 10.7A5.4 5.4 0 013.68 9c0-.59.1-1.17.27-1.7V4.97H.96A9 9 0 000 9c0 1.45.35 2.83.96 4.03l2.99-2.33z" />
      <path fill="#EA4335" d="M9 3.58c1.32 0 2.51.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 00.96 4.97l2.99 2.33C4.66 5.17 6.65 3.58 9 3.58z" />
    </svg>
  );
}

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mounted, setMounted] = useState(false);
  const [typedLines, setTypedLines] = useState(0);

  useEffect(() => {
    setMounted(true);
    const timers = TRANSCRIPT.map((_, i) =>
      setTimeout(() => setTypedLines((n) => Math.max(n, i + 1)), 500 + i * 900)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Wire up to your auth flow here.
    console.log({ email, password, remember });
    navigate("/dashboard");
  };

  return (
    <div className="login-page">
      <style>{`
        .login-page {
          min-height: 100vh;
          width: 100%;
          display: flex;
          align-items: stretch;
          background: #FAF8F4;
          font-family: ui-sans-serif, system-ui, sans-serif;
        }

        * { box-sizing: border-box; }

        /* ---------- keyframes ---------- */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes lineIn {
          from { opacity: 0; transform: translateX(-6px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes caretBlink {
          0%, 45% { opacity: 1; }
          50%, 95% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes drift {
          0% { transform: translate(0, 0); }
          50% { transform: translate(-14px, 10px); }
          100% { transform: translate(0, 0); }
        }

        .fade-up { animation: fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both; }
        .line-in { animation: lineIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) both; }
        .hidden-line { opacity: 0; }
        .caret {
          display: inline-block;
          width: 8px;
          height: 16px;
          background: #C9A24B;
          animation: caretBlink 1s step-end infinite;
        }
        .drift { animation: drift 14s ease-in-out infinite; }

        /* ---------- left panel ---------- */
        .side-panel {
          display: none;
          width: 46%;
          flex-direction: column;
          justify-content: space-between;
          padding: 48px;
          position: relative;
          overflow: hidden;
          background: radial-gradient(circle at 15% 0%, #1B2130 0%, #141821 55%, #101319 100%);
        }
        @media (min-width: 1024px) {
          .side-panel { display: flex; }
        }

        .glow-blob {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
        }
        .glow-blob--teal {
          top: -96px;
          left: -64px;
          width: 320px;
          height: 320px;
          background: #2F6F62;
          opacity: 0.16;
          filter: blur(90px);
        }
        .glow-blob--gold {
          bottom: 0;
          right: 0;
          width: 288px;
          height: 288px;
          background: #C9A24B;
          opacity: 0.1;
          filter: blur(100px);
          animation-delay: -7s;
        }

        .ruled-texture {
          position: absolute;
          inset: 0;
          opacity: 0.05;
          pointer-events: none;
          background-image: repeating-linear-gradient(transparent, transparent 27px, #C9A24B 28px);
        }

        .brand-row {
          position: relative;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .brand-mark {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #2F6F62;
          box-shadow: 0 4px 14px rgba(47,111,98,0.45);
        }
        .brand-mark span {
          font-size: 13px;
          font-weight: 600;
          color: #FAF8F4;
        }
        .brand-mark--light {
          box-shadow: 0 4px 14px rgba(47,111,98,0.3);
        }
        .brand-name {
          font-size: 15px;
          letter-spacing: 0.03em;
          color: #F0EDE4;
          font-family: 'IBM Plex Mono', ui-monospace, monospace;
        }
        .brand-name--dark { color: #141821; }

        .transcript {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 20px;
          max-width: 420px;
        }
        .transcript-line {
          display: flex;
          gap: 12px;
          align-items: flex-start;
        }
        .transcript-index {
          font-size: 11px;
          margin-top: 4px;
          flex-shrink: 0;
          width: 20px;
          text-align: right;
          color: #5A6270;
          font-family: 'IBM Plex Mono', ui-monospace, monospace;
        }
        .transcript-text {
          line-height: 1.6;
          margin: 0;
        }
        .transcript-text--q {
          color: #D8B463;
          font-family: ui-serif, Georgia, 'Times New Roman', serif;
          font-style: italic;
          font-size: 17.5px;
        }
        .transcript-text--a {
          color: #DCD8CE;
          font-family: 'IBM Plex Mono', ui-monospace, monospace;
          font-size: 14px;
        }

        .side-footer {
          position: relative;
          font-size: 13px;
          line-height: 1.6;
          max-width: 320px;
          color: #5A6270;
        }

        /* ---------- right panel ---------- */
        .form-panel {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 24px;
          position: relative;
        }
        @media (min-width: 640px) {
          .form-panel { padding: 40px; }
        }
        .form-panel-glow {
          pointer-events: none;
          position: absolute;
          top: 0;
          right: 0;
          width: 420px;
          height: 420px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(47,111,98,0.06) 0%, transparent 70%);
        }

        .form-wrap {
          width: 100%;
          max-width: 384px;
          position: relative;
        }
        .invisible { opacity: 0; }

        .mobile-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 40px;
        }
        @media (min-width: 1024px) {
          .mobile-brand { display: none; }
        }

        .card {
          background: #FFFFFF;
          border: 1px solid #EFEBE0;
          border-radius: 16px;
          padding: 36px;
          box-shadow: 0 1px 2px rgba(20,24,33,0.04), 0 20px 48px -20px rgba(20,24,33,0.14);
        }
        @media (min-width: 640px) {
          .card { padding: 36px; }
        }

        .card h1 {
          font-size: 30px;
          line-height: 1.2;
          margin: 0 0 6px 0;
          color: #141821;
          font-family: ui-serif, Georgia, 'Times New Roman', serif;
          font-weight: 400;
        }
        .card-subtitle {
          font-size: 14.5px;
          margin: 0 0 32px 0;
          color: #6B7280;
        }

        .field-group {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .field-label {
          font-size: 11.5px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #8A8F98;
          font-family: 'IBM Plex Mono', ui-monospace, monospace;
        }
        .field-input {
          padding: 10px 14px;
          border-radius: 8px;
          font-size: 15px;
          outline: none;
          background: #FFFFFF;
          border: 1px solid #E4E0D6;
          color: #141821;
          box-shadow: 0 1px 2px rgba(20,24,33,0.03);
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
          width: 100%;
          font-family: inherit;
        }
        .field-input::placeholder { color: #B0AB9E; }
        .field-input:focus {
          border-color: #2F6F62;
          box-shadow: 0 0 0 3px rgba(47,111,98,0.14), 0 1px 2px rgba(20,24,33,0.03);
        }

        .password-field { position: relative; }
        .password-field .field-input { padding-right: 40px; }
        .password-toggle {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          color: #8A8F98;
          display: flex;
          transition: color 0.2s ease;
        }
        .password-toggle:hover { color: #2F6F62; }

        .row-between {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 13.5px;
        }

        .remember-label {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          user-select: none;
          color: #4B5058;
          transition: color 0.2s ease;
        }
        .remember-label:hover { color: #141821; }
        .remember-label input {
          width: 14px;
          height: 14px;
          cursor: pointer;
          accent-color: #2F6F62;
        }

        .link {
          color: #2F6F62;
          font-weight: 500;
          text-decoration: none;
        }
        .link:hover { text-decoration: underline; text-underline-offset: 2px; }

        .submit-btn {
          margin-top: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 11px;
          border-radius: 8px;
          border: none;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          background: #141821;
          color: #FAF8F4;
          box-shadow: 0 8px 20px -8px rgba(20,24,33,0.5);
          transition: box-shadow 0.2s ease, transform 0.1s ease;
        }
        .submit-btn:hover { box-shadow: 0 10px 24px -8px rgba(20,24,33,0.6); }
        .submit-btn:active { transform: scale(0.99); }

        .divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 24px 0;
        }
        .divider-line { height: 1px; flex: 1; background: #E4E0D6; }
        .divider-label {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #B0AB9E;
          font-family: 'IBM Plex Mono', ui-monospace, monospace;
        }

        .google-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 10px;
          border-radius: 8px;
          font-size: 14.5px;
          cursor: pointer;
          background: #FFFFFF;
          border: 1px solid #E4E0D6;
          color: #333740;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .google-btn:hover {
          border-color: #C9C4B6;
          box-shadow: 0 1px 4px rgba(20,24,33,0.06);
        }

        .signup-line {
          text-align: center;
          font-size: 13.5px;
          margin-top: 28px;
          color: #6B7280;
        }
      `}</style>

      {/* Left: scene-setting panel, hidden on small screens */}
      <div className="side-panel">
        <div className="glow-blob glow-blob--teal drift" />
        <div className="glow-blob glow-blob--gold drift" />
        <div className="ruled-texture" />

        <div className="brand-row fade-up" style={{ animationDelay: "0.05s" }}>
          <div className="brand-mark">
            <span>AI</span>
          </div>
          <span className="brand-name">interview.log</span>
        </div>

        <div className="transcript">
          {TRANSCRIPT.map((line, i) => (
            <div
              key={i}
              className={`transcript-line ${typedLines > i ? "line-in" : "hidden-line"}`}
            >
              <span className="transcript-index">{String(i + 1).padStart(2, "0")}</span>
              <p className={`transcript-text ${line.role === "q" ? "transcript-text--q" : "transcript-text--a"}`}>
                {line.text}
              </p>
            </div>
          ))}
          <div className={`transcript-line ${typedLines >= TRANSCRIPT.length ? "line-in" : "hidden-line"}`}>
            <span className="transcript-index">03</span>
            <span className="caret" />
          </div>
        </div>

        <p className="side-footer fade-up" style={{ animationDelay: "0.4s" }}>
          Every session picks up the transcript where you left off.
        </p>
      </div>

      {/* Right: form panel */}
      <div className="form-panel">
        <div className="form-panel-glow" />

        <div className={`form-wrap ${mounted ? "fade-up" : "invisible"}`}>
          <div className="mobile-brand">
            <div className="brand-mark brand-mark--light">
              <span>AI</span>
            </div>
            <span className="brand-name brand-name--dark">interview.log</span>
          </div>

          <div className="card">
            <h1>Welcome back</h1>
            <p className="card-subtitle">Continue your interview prep.</p>

            <form onSubmit={handleSubmit} className="field-group">
              <label className="field">
                <span className="field-label">Email</span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="field-input"
                />
              </label>

              <label className="field">
                <span className="field-label">Password</span>
                <div className="password-field">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••"
                    className="field-input"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="password-toggle"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </label>

              <div className="row-between" style={{ marginTop: "-8px" }}>
                <label className="remember-label">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                  />
                  <span>Remember me</span>
                </label>
                <a href="#" className="link">Forgot password?</a>
              </div>

              <button type="submit" className="submit-btn">
                Log in
                <ArrowRight size={16} />
              </button>
            </form>

            <div className="divider">
              <div className="divider-line" />
              <span className="divider-label">or</span>
              <div className="divider-line" />
            </div>

            <button type="button" className="google-btn">
              <GoogleMark />
              Continue with Google
            </button>
          </div>

          <p className="signup-line">
            New here? <a href="#" className="link">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
}