import Dashboardnew from "./pages/Dashboard_new";
import TopNav from "./components/topnavbar";
import SidebarLayout from "./components/sidenavbar";
import CodingArena from "./pages/CodingArena";
import MockInterview from "./pages/MockInterview";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import Progress from './pages/Progress';
import Profile from './pages/Profile';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <TopNav />

      <div style={{ display: "flex" }}>
        <SidebarLayout />

        <main
          style={{
            flex: 1,
            padding: "20px",
          }}
        >
          <Routes>
            <Route path="/" element={<Dashboardnew />} />
            <Route path="/dashboard" element={<Dashboardnew />} />
            <Route path="/coding-arena" element={<CodingArena />} />
            <Route path="/mock-interview" element={<MockInterview />} />
            <Route path="/resume-analyzer" element={<ResumeAnalyzer />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}