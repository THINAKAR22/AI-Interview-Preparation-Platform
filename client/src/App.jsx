import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboardnew from "./pages/Dashboard_new";
import TopNav from "./components/new_topnavbar";
import SidebarLayout from "./components/new_sidebar";
import CodingArena from "./pages/CodingArena";
import MockInterview from "./pages/MockInterview";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import Progress from "./pages/Progress";
import Profile from "./pages/Profile";
import "./App.css";
import LoginPage from "./components/loginpage";

export default function App() {
  return (
    <Router>
      <div className="app-shell">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/*"
            element={
              <>
                <TopNav />
                <SidebarLayout />
                <main className="app-main">
                  <Routes>
                    <Route path="/dashboard" element={<Dashboardnew />} />
                    <Route path="/coding-arena" element={<CodingArena />} />
                    <Route path="/mock-interview" element={<MockInterview />} />
                    <Route path="/resume-analyzer" element={<ResumeAnalyzer />} />
                    <Route path="/progress" element={<Progress />} />
                    <Route path="/profile" element={<Profile />} />
                  </Routes>
                </main>
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}
