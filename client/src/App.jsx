import Dashboardnew from "./pages/Dashboard_new";
import TopNav from "./components/topnavbar.jsx";
import SidebarLayout from "./components/sidenavbar.jsx";
import CodingArena from "./pages/CodingArena.jsx";
import MockInterview from "./pages/MockInterview.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


export default function App() {
  return (
    <Router>
      <TopNav />
      <SidebarLayout />
      <Routes>
        <Route path="/" element={<Dashboardnew />} />
        <Route path="/dashboard" element={<Dashboardnew />} />
        <Route path="/coding-arena" element={<CodingArena />} />
        <Route path="/mock-interview" element={<MockInterview />} />
      </Routes>
    </Router>
  );
}
