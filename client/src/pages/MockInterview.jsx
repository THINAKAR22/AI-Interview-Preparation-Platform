import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play, History, Briefcase, Award, Layers, Sliders,
  Video, Mic, MicOff, VideoOff, ChevronLeft, ChevronRight,
  Send, Sparkles, CheckCircle2, AlertCircle, Clock,
  Download, RefreshCw, BarChart3, PieChart as PieIcon, ArrowRight
} from 'lucide-react';
import {
  ResponsiveContainer, PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid
} from 'recharts';
import './MockInterview.css';

// --- Static Analytical Records ---
const pieData = [
  { name: 'Technical', value: 40, color: '#6366f1' },
  { name: 'Behavioral', value: 25, color: '#3b82f6' },
  { name: 'System Design', value: 20, color: '#a855f7' },
  { name: 'HR', value: 15, color: '#ec4899' },
];

const barData = [
  { name: 'Session 1', score: 68 },
  { name: 'Session 2', score: 75 },
  { name: 'Session 3', score: 82 },
  { name: 'Session 4', score: 78 },
  { name: 'Session 5', score: 88 },
];

const historyData = [
  { id: 1, date: 'June 22, 2026', role: 'Backend Developer', type: 'Technical', score: 88, duration: '24 mins' },
  { id: 2, date: 'June 18, 2026', role: 'Full Stack Developer', type: 'System Design', score: 78, duration: '40 mins' },
  { id: 3, date: 'June 10, 2026', role: 'Backend Developer', type: 'Behavioral', score: 82, duration: '15 mins' },
];

export default function MockInterview() {
  const [view, setView] = useState('landing');
  const [role, setRole] = useState('Backend Developer');
  const [experience, setExperience] = useState('Fresher');
  const [type, setType] = useState('Technical');
  const [difficulty, setDifficulty] = useState('Medium');
  const [numQuestions, setNumQuestions] = useState(10);
  const [cameraOn, setCameraOn] = useState(true);
  const [voiceOn, setVoiceOn] = useState(true);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [textAnswer, setTextAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180);

  const questions = [
    "Can you explain how architectural decisions change when transitioning from a monolithic to a microservices ecosystem, specifically regarding distributed data consistency?",
    "How do you design and optimize a database schema for high-throughput, low-latency write operations while preventing race conditions?"
  ];

  useEffect(() => {
    let timer;
    if (view === 'interview' && timeLeft > 0 && !showFeedback) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [view, timeLeft, showFeedback]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleStartInterview = () => {
    setCurrentQuestionIdx(0);
    setShowFeedback(false);
    setTextAnswer('');
    setTimeLeft(180);
    setView('interview');
  };

  return (
    <div className="interview-wrapper-white">
      {/* Subtle background accents */}
      <div className="glow-light-1" />
      <div className="glow-light-2" />

      {/* --- Top Global Bar --- */}


      <main className="container-white">
        <AnimatePresence mode="wait">

          {/* ================= HERO SYSTEM VIEW ================= */}
          {view === 'landing' && (
            <motion.div key="landing" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="hero-grid-white">
              <div className="hero-content-white">
                <h1 className="hero-title-white">Practice Real Interviews <br /><span className="gradient-text-white">with Intelligent AI</span></h1>
                <p className="hero-subtitle-white">Get personalized enterprise-grade technical and behavioral evaluations. Answer natively using your voice, preview your camera stream, and obtain deep contextual metrics maps instantly.</p>
                <div className="btn-group-white">
                  <button onClick={() => setView('setup')} className="btn-primary-white"><Play style={{ width: '1rem', height: '1rem', fill: 'currentColor' }} /> Start Mock Interview</button>
                  <button onClick={() => setView('dashboard')} className="btn-secondary-white"><History style={{ width: '1rem', height: '1rem' }} /> View Previous Sessions</button>
                </div>
              </div>

              {/* Graphical Interaction Mock Module */}
              <div style={{ position: 'relative' }}>
                <div className="glass-card-white" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                    <div style={{ display: 'flex', gap: '0.375rem' }}>
                      <div style={{ width: '0.75rem', height: '0.75rem', borderRadius: '50%', backgroundColor: '#ef4444' }} />
                      <div style={{ width: '0.75rem', height: '0.75rem', borderRadius: '50%', backgroundColor: '#f59e0b' }} />
                      <div style={{ width: '0.75rem', height: '0.75rem', borderRadius: '50%', backgroundColor: '#10b981' }} />
                    </div>
                    <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontFamily: 'monospace' }}>session_active.log</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', gap: '0.75rem', maxWidth: '85%' }}>
                      <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '0.75rem', fontSize: '0.75rem', color: '#334155' }}>How do you resolve complex resource locking deadlocks in transactional distributed database landscapes?</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ================= CONFIGURATION TERMINAL VIEW ================= */}
          {view === 'setup' && (
            <motion.div key="setup" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} className="setup-container-white">
              <div className="glass-card-white">
                <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', alignItems: 'center' }}>
                  <div style={{ padding: '0.5rem', backgroundColor: 'rgba(99,102,241,0.1)', borderRadius: '0.5rem', color: '#4f46e5' }}><Sliders /></div>
                  <div>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: 0, color: '#0f172a' }}>Configure Pipeline Context</h2>
                    <p style={{ fontSize: '0.875rem', color: '#64748b', margin: 0 }}>Tailor target profiles and operational constraints.</p>
                  </div>
                </div>

                <div className="form-grid-white">
                  <div className="form-group-white">
                    <label className="form-label-white"><Briefcase style={{ width: '0.875rem', height: '0.875rem' }} /> Target Role Profile</label>
                    <select value={role} onChange={(e) => setRole(e.target.value)} className="form-select-white">
                      <option>Backend Developer</option>
                      <option>Frontend Developer</option>
                      <option>Full Stack Developer</option>
                      <option>Data Analyst</option>
                    </select>
                  </div>
                  <div className="form-group-white">
                    <label className="form-label-white"><Award style={{ width: '0.875rem', height: '0.875rem' }} /> Seniority Matrix</label>
                    <select value={experience} onChange={(e) => setExperience(e.target.value)} className="form-select-white">
                      <option>Fresher</option>
                      <option>1-3 Years</option>
                      <option>3-5 Years</option>
                    </select>
                  </div>
                </div>

                <div className="toggle-grid-white">
                  <div className="toggle-card-white">
                    <span style={{ fontSize: '0.875rem', color: '#334155' }}>Stream Camera Buffer</span>
                    <input type="checkbox" checked={cameraOn} onChange={() => setCameraOn(!cameraOn)} style={{ width: '1rem', height: '1rem', accentColor: '#4f46e5' }} />
                  </div>
                  <div className="toggle-card-white">
                    <span style={{ fontSize: '0.875rem', color: '#334155' }}>Acoustic Recording</span>
                    <input type="checkbox" checked={voiceOn} onChange={() => setVoiceOn(!voiceOn)} style={{ width: '1rem', height: '1rem', accentColor: '#4f46e5' }} />
                  </div>
                </div>

                <button onClick={handleStartInterview} className="btn-primary-white" style={{ width: '100%', marginTop: '2rem', justifyContent: 'center' }}>
                  Initialize Engine Pipeline <ArrowRight style={{ width: '1rem', height: '1rem' }} />
                </button>
              </div>
            </motion.div>
          )}

          {/* ================= INTERVIEW RUNTIME STREAM VIEW ================= */}
          {view === 'interview' && (
            <motion.div key="interview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="interview-grid-white">
              {/* LEFT OPERATIONAL COMPONENT */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div className="glass-card-white" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: '1rem', right: '1rem', display: 'flex', alignItems: 'center', gap: '0.375rem', padding: '0.375rem 0.75rem', background: '#f1f5f9', borderRadius: '0.5rem', fontSize: '0.75rem', fontFamily: 'monospace', color: '#334155' }}>
                    <Clock style={{ width: '0.875rem', height: '0.875rem', color: '#f59e0b' }} /> {formatTime(timeLeft)}
                  </div>

                  <div className="avatar-pulse-container-white">
                    <div className="avatar-white"><Sparkles style={{ width: '2rem', height: '2rem', color: '#fff' }} /></div>
                    {!showFeedback && <div className="pulse-ring-white-1" />}
                  </div>

                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#4f46e5', fontWeight: 'bold' }}>AI Realtime Evaluator</span>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '1rem' }}>Question {currentQuestionIdx + 1} of {questions.length}</span>

                  <div style={{ width: '100%', textAlign: 'left', background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1rem', borderRadius: '0.75rem', fontSize: '0.875rem', color: '#0f172a' }}>
                    {questions[currentQuestionIdx]}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '1.5rem', borderTop: '1px solid #e2e8f0', paddingTop: '1rem' }}>
                    <button onClick={() => setCurrentQuestionIdx(p => Math.max(0, p - 1))} disabled={currentQuestionIdx === 0} className="btn-secondary-white" style={{ padding: '0.5rem 1rem', fontSize: '0.75rem' }}><ChevronLeft /> Back</button>
                    <button onClick={() => setView('dashboard')} className="btn-secondary-white" style={{ padding: '0.5rem 1rem', fontSize: '0.75rem', color: '#4f46e5' }}>Finish Session <ChevronRight /></button>
                  </div>
                </div>

                {/* DYNAMIC METRIC FEEDBACK DISPLAY CONTAINER */}
                {showFeedback && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card-white" style={{ borderColor: 'rgba(99,102,241,0.2)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', color: '#475569' }}>Structural Metric Insights</span>
                      <span style={{ fontSize: '0.65rem', color: '#10b981', background: 'rgba(16,185,129,0.1)', padding: '0.25rem 0.5rem', borderRadius: '0.25rem' }}>Verified</span>
                    </div>
                    <div className="score-micro-grid-white">
                      <div className="score-tile-white"><span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#4f46e5' }}>88</span><span style={{ fontSize: '0.6rem', color: '#94a3b8' }}>Global</span></div>
                      <div className="score-tile-white"><span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#3b82f6' }}>92</span><span style={{ fontSize: '0.6rem', color: '#94a3b8' }}>Tech Spec</span></div>
                      <div className="score-tile-white"><span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#8b5cf6' }}>84</span><span style={{ fontSize: '0.6rem', color: '#94a3b8' }}>Delivery</span></div>
                      <div className="score-tile-white"><span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#10b981' }}>90</span><span style={{ fontSize: '0.6rem', color: '#94a3b8' }}>Stability</span></div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* RIGHT HAND AUDIO/VIDEO INGESTION PANEL */}
              <div className="glass-card-white" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div className="webcam-box-white">
                  {cameraOn ? (
                    <div style={{ textAlign: 'center', opacity: 0.4, color: '#475569' }}>
                      <Video style={{ width: '2.5rem', height: '2.5rem', marginBottom: '0.5rem' }} />
                      <div style={{ fontSize: '0.75rem', fontFamily: 'monospace' }}>CAMERA CAPTURE TERM ACTIVE</div>
                    </div>
                  ) : (
                    <VideoOff style={{ color: '#94a3b8' }} />
                  )}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: '0.75rem' }}>
                  <button onClick={() => setIsRecording(!isRecording)} className={`btn-secondary-white ${isRecording ? 'recording-active' : ''}`} style={{ justifyContent: 'center' }}>
                    <Mic style={{ width: '1rem', height: '1rem' }} /> {isRecording ? 'Halt Capture' : 'Ingest Audio Stream'}
                  </button>
                  <button onClick={() => setShowFeedback(true)} disabled={!textAnswer.trim()} className="btn-primary-white" style={{ justifyContent: 'center' }}><Send /></button>
                </div>

                <div className="transcription-box-white">
                  {isRecording ? '[Streaming Buffer Ingest] "Leveraging non-blocking I/O architectures within processing channels..."' : '"No transactional vocal frame detected."'}
                </div>

                <textarea value={textAnswer} onChange={(e) => setTextAnswer(e.target.value)} placeholder="Type or structurally trace your technical verification matrices explicitly..." rows={4} className="textarea-override-white" />
              </div>
            </motion.div>
          )}

          {/* ================= ANALYTICS REPORT DASHBOARD VIEW ================= */}
          {view === 'dashboard' && (
            <motion.div key="dashboard" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
              <button className='back' onClick={() => setView('landing')}>➜</button>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc', padding: '1.25rem', borderRadius: '1rem', border: '1px solid #e2e8f0' }}>
                <div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: 0, color: '#0f172a' }}>Performance Analysis Profile</h2>
                  <p style={{ fontSize: '0.875rem', color: '#64748b', margin: 0 }}>System analysis compilation ledger.</p>
                </div>
                <button className="btn-primary-white" style={{ padding: '0.5rem 1rem', fontSize: '0.75rem' }}><Download style={{ width: '0.875rem', height: '0.875rem' }} /> Export Dossier (PDF)</button>
              </div>

              <div className="metrics-quad-grid-white">
                {[
                  { title: 'Total Evaluated Tasks', val: '42', col: '#3b82f6' },
                  { title: 'Technical Pass Threshold', val: '84%', col: '#8b5cf6' },
                  { title: 'Mean Velocity Index', val: '2.4m', col: '#4f46e5' },
                  { title: 'Aggregate Quality Quotient', val: '81/100', col: '#10b981' }
                ].map((stat, i) => (
                  <div key={i} className="glass-card-white" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '6rem' }}>
                    <span style={{ fontSize: '0.65rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 'bold' }}>{stat.title}</span>
                    <span style={{ fontSize: '1.75rem', fontWeight: 'bold', color: stat.col, fontFamily: 'monospace' }}>{stat.val}</span>
                  </div>
                ))}
              </div>

              {/* Charting Framework Insertion Blocks */}
              <div className="chart-layout-grid-white">
                <div className="glass-card-white" style={{ minHeight: '18rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', color: '#64748b' }}><PieIcon style={{ width: '0.875rem', height: '0.875rem', verticalAlign: 'middle', marginRight: '0.25rem' }} /> Category Balance Metrics</span>
                  <div style={{ width: '100%', height: '12rem' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={4} dataKey="value">
                          {pieData.map((entry, idx) => <Cell key={`cell-${idx}`} fill={entry.color} />)}
                        </Pie>
                        <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '8px', color: '#0f172a', fontSize: '11px' }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="glass-card-white" style={{ minHeight: '18rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', color: '#64748b' }}><BarChart3 style={{ width: '0.875rem', height: '0.875rem', verticalAlign: 'middle', marginRight: '0.25rem' }} /> Chronological Evolution Track</span>
                  <div style={{ width: '100%', height: '13rem', marginTop: '0.5rem' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={barData} margin={{ top: 10, right: 10, left: -30, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                        <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} />
                        <YAxis stroke="#94a3b8" fontSize={10} domain={[0, 100]} tickLine={false} />
                        <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '8px', color: '#0f172a', fontSize: '11px' }} />
                        <Bar dataKey="score" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
  );
}