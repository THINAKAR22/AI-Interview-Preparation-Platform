import './sidenavbar.css';
import logo from '../assets/logo.png';

export default function SidebarLayout() {
  return (
    <div className="app">

      {/* SIDEBAR */}
      <aside className="sidebar">

        <nav className="menu">
          <a href="/dashboard" className='active'>🏠 Dashboard</a>
          <a href="/coding-arena">💻 Coding Arena</a>
          <a href="/mock-interview">🎤 Mock Interview</a>
          <a href="/resume-analyzer">📄 Resume Analyzer</a>
          <a href="/progress">📈 Progress</a>
          <a href="/profile">👤 Profile</a>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="content">
        <h1>Dashboard</h1>
        <p>Welcome back bro 🚀</p>
      </main>

    </div>
  );
}