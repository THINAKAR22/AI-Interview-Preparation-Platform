import logo from '../assets/logo.png';
import { useEffect, useState } from 'react';
import './Dashboard.css';
import SidebarLayout from '../components/sidenavbar';
import SearchBar from '../components/searchbar';

function Dashboard({ navigate }) {
  const [stats, setStats] = useState({
    questionsSolved: 0,
    mockInterviews: 0,
    codingHours: 0,
    progress: 0,
  });
  
  return (
    <>
    <SearchBar />
    <SidebarLayout />
    </>

  );
}

export default Dashboard;