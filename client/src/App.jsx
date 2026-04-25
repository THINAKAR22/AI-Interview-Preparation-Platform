import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import MockInterview from "./pages/MockInterview";
import CodingArena from "./pages/CodingArena";
import HRQuestions from "./pages/HRQuestions";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import Progress from "./pages/Progress";
import Profile from "./pages/Profile";
import BottomNav from "./components/bottomnavbar";
import TopNav from "./components/topnavbar";

export default function App() {
  const [page, setPage] = useState("dashboard");
  const [interviewType, setInterviewType] = useState(null);

  const navigate = (p, extra) => {
    setPage(p);
    if (extra) setInterviewType(extra);
  };

  const renderPage = () => {
    switch (page) {
      case "dashboard": return <Dashboard navigate={navigate} />;
      case "mock-interview": return <MockInterview navigate={navigate} type={interviewType} />;
      case "coding": return <CodingArena navigate={navigate} />;
      case "hr": return <HRQuestions navigate={navigate} />;
      case "resume": return <ResumeAnalyzer navigate={navigate} />;
      case "progress": return <Progress navigate={navigate} />;
      case "profile": return <Profile navigate={navigate} />;
      default: return <Dashboard navigate={navigate} />;
    }
  };

  return (
    <div style={{ background: "#0D0F14", minHeight: "100vh", fontFamily: "'DM Sans', sans-serif", color: "#E8EAF0" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;700&family=DM+Sans:wght@300;400;500&family=JetBrains+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --bg: #0D0F14; --s1: #141720; --s2: #1A1E2B; --border: #2A2F42;
          --accent: #6C63FF; --green: #00D4AA; --red: #F06595; --amber: #FBBF24;
          --text: #E8EAF0; --muted: #7B8099; --dim: #4A5068;
          --fh: 'Syne', sans-serif; --fb: 'DM Sans', sans-serif; --fm: 'JetBrains Mono', monospace;
        }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: var(--bg); }
        ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }
        button { cursor: pointer; font-family: var(--fb); }
        input, textarea, select { font-family: var(--fb); }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes spin { to { transform: rotate(360deg); } }
        .fade-in { animation: fadeIn 0.3s ease forwards; }
      `}</style>
      <TopNav page={page} navigate={navigate} />
      <div style={{ paddingBottom: 64 }}>{renderPage()}</div>
      <BottomNav page={page} navigate={navigate} />
    </div>
  );
}