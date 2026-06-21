import Dashboardnew from "./pages/Dashboard_new";
import TopNav from "./components/topnavbar";
import SidebarLayout from "./components/sidenavbar";
import CodingArena from "./pages/CodingArena";
import MockInterview from "./pages/MockInterview";

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
          </Routes>
        </main>
      </div>
    </Router>
  );
}