import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Filter, ChevronDown, ChevronUp, Star, Bookmark,
  CheckCircle, Clock, RefreshCw, ThumbsUp, ThumbsDown,
  Mic, MicOff, Send, ArrowLeft
} from 'lucide-react';

/* ─── Data ──────────────────────────────────────────────────── */
const CATEGORIES = ['All', 'Introduction', 'Strengths & Weaknesses', 'Career Goals', 'Teamwork', 'Conflict Resolution', 'Leadership', 'Motivation', 'Culture Fit'];

const HR_QUESTIONS = [
  {
    id: 1, category: 'Introduction', difficulty: 'Easy', starred: true,
    question: 'Tell me about yourself.',
    tips: ['Keep it under 2 minutes', 'Follow Present-Past-Future structure', 'Tailor it to the job role'],
    sampleAnswer: 'I\'m a software engineer with a passion for building scalable web applications. I recently graduated with a CS degree and have been sharpening my skills through personal projects and open-source contributions. I\'m particularly excited about this role because it blends my interest in backend systems with real user impact.',
  },
  {
    id: 2, category: 'Strengths & Weaknesses', difficulty: 'Medium', starred: false,
    question: 'What is your greatest strength?',
    tips: ['Choose a strength relevant to the role', 'Provide a concrete example', 'Show measurable impact'],
    sampleAnswer: 'My greatest strength is problem-solving under pressure. During a critical production outage at my internship, I debugged a database bottleneck within 3 hours that was affecting thousands of users, cutting response times by 60%.',
  },
  {
    id: 3, category: 'Strengths & Weaknesses', difficulty: 'Hard', starred: false,
    question: 'What is your greatest weakness?',
    tips: ['Be honest but strategic', 'Show self-awareness', 'Explain what you are doing to improve'],
    sampleAnswer: 'I used to struggle with delegating tasks, wanting to ensure everything was done perfectly. I\'ve been actively working on this by trusting teammates with well-defined tasks and following up via async updates rather than micromanaging.',
  },
  {
    id: 4, category: 'Career Goals', difficulty: 'Medium', starred: true,
    question: 'Where do you see yourself in 5 years?',
    tips: ['Align goals with company growth', 'Show ambition but be realistic', 'Mention skill development'],
    sampleAnswer: 'In 5 years I see myself as a senior engineer leading a small team, contributing to architectural decisions, and mentoring junior developers. I\'d love to grow within a company where I can take ownership of products end-to-end.',
  },
  {
    id: 5, category: 'Teamwork', difficulty: 'Medium', starred: false,
    question: 'Describe a time you worked effectively as part of a team.',
    tips: ['Use the STAR method', 'Highlight your specific contribution', 'Mention the outcome'],
    sampleAnswer: 'During my final year project, I collaborated with 4 teammates to build a real-time chat app. I took ownership of the backend architecture, set up daily standups, and resolved a major merge conflict crisis. We delivered the project a week early with a 95% test coverage.',
  },
  {
    id: 6, category: 'Conflict Resolution', difficulty: 'Hard', starred: false,
    question: 'Tell me about a time you had a conflict with a colleague. How did you handle it?',
    tips: ['Stay professional and objective', 'Focus on resolution, not blame', 'Highlight communication skills'],
    sampleAnswer: 'I disagreed with a teammate about the API design approach. Instead of escalating, I requested a 1-on-1, laid out my technical concerns with diagrams, and listened to their perspective. We found a hybrid approach that satisfied both requirements and shipped on time.',
  },
  {
    id: 7, category: 'Leadership', difficulty: 'Hard', starred: false,
    question: 'Give an example of when you demonstrated leadership skills.',
    tips: ['Leadership doesn\'t require a title', 'Focus on initiative and impact', 'Quantify results if possible'],
    sampleAnswer: 'When our team lead was on leave, I proactively organized daily standups, unblocked tickets, and coordinated with the QA team. The sprint was completed on schedule, and my manager later cited this in my performance review.',
  },
  {
    id: 8, category: 'Motivation', difficulty: 'Easy', starred: true,
    question: 'Why do you want to work at our company?',
    tips: ['Research the company beforehand', 'Connect company values with yours', 'Mention specific products or missions'],
    sampleAnswer: 'I admire how your company prioritizes developer tooling and open-source contributions. I\'ve personally used your CLI tool and was impressed by the developer experience. I\'d love to contribute to a product I genuinely use and believe in.',
  },
  {
    id: 9, category: 'Culture Fit', difficulty: 'Easy', starred: false,
    question: 'How do you handle working in a fast-paced environment?',
    tips: ['Give a real example', 'Show adaptability', 'Mention prioritization skills'],
    sampleAnswer: 'I thrive in fast-paced settings. I use task prioritization with a daily 3-priority list, timebox tasks to avoid perfectionism, and communicate progress proactively. During a hackathon, I built a working MVP in 24 hours by staying focused on core features first.',
  },
  {
    id: 10, category: 'Career Goals', difficulty: 'Easy', starred: false,
    question: 'Why are you leaving your current position?',
    tips: ['Stay positive and forward-looking', 'Never badmouth your employer', 'Focus on growth opportunities'],
    sampleAnswer: 'I\'ve learned a tremendous amount in my current role and I\'m grateful for the experience. I\'m now looking for an opportunity with greater scope to work on distributed systems at scale, which aligns perfectly with what this role offers.',
  },
];

const DIFFICULTY_COLORS = { Easy: '#10b981', Medium: '#f59e0b', Hard: '#ef4444' };

/* ─── Sub-components ─────────────────────────────────────────── */
function DifficultyBadge({ level }) {
  return (
    <span style={{
      fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em',
      padding: '2px 8px', borderRadius: '999px',
      background: DIFFICULTY_COLORS[level] + '20',
      color: DIFFICULTY_COLORS[level],
    }}>
      {level}
    </span>
  );
}

function QuestionCard({ q, onPractice }) {
  const [expanded, setExpanded] = useState(false);
  const [bookmarked, setBookmarked] = useState(q.starred);
  const [rating, setRating] = useState(null);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        background: '#fff', borderRadius: '1rem',
        border: '1px solid #e2e8f0',
        boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
        overflow: 'hidden', marginBottom: '1rem',
      }}
    >
      {/* Header */}
      <div
        style={{ padding: '1.25rem 1.5rem', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}
        onClick={() => setExpanded((p) => !p)}
      >
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.7rem', color: '#6366f1', fontWeight: 600, background: '#6366f120', padding: '2px 8px', borderRadius: '999px' }}>
              {q.category}
            </span>
            <DifficultyBadge level={q.difficulty} />
          </div>
          <p style={{ margin: 0, fontSize: '0.975rem', fontWeight: 600, color: '#0f172a', lineHeight: 1.5 }}>{q.question}</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
          <button
            onClick={(e) => { e.stopPropagation(); setBookmarked(!bookmarked); }}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: bookmarked ? '#f59e0b' : '#94a3b8', padding: '0.25rem' }}
          >
            <Bookmark size={16} fill={bookmarked ? '#f59e0b' : 'none'} />
          </button>
          {expanded ? <ChevronUp size={18} color="#94a3b8" /> : <ChevronDown size={18} color="#94a3b8" />}
        </div>
      </div>

      {/* Expanded Body */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ padding: '0 1.5rem 1.5rem', borderTop: '1px solid #f1f5f9' }}>
              {/* Tips */}
              <div style={{ marginTop: '1rem' }}>
                <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#64748b', marginBottom: '0.5rem' }}>💡 Tips</p>
                <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
                  {q.tips.map((tip, i) => (
                    <li key={i} style={{ fontSize: '0.875rem', color: '#334155', marginBottom: '0.25rem' }}>{tip}</li>
                  ))}
                </ul>
              </div>

              {/* Sample Answer */}
              <div style={{ marginTop: '1rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '0.75rem', padding: '1rem' }}>
                <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#6366f1', marginBottom: '0.5rem' }}>
                  ✨ Sample Answer
                </p>
                <p style={{ margin: 0, fontSize: '0.875rem', color: '#334155', lineHeight: 1.65 }}>{q.sampleAnswer}</p>
              </div>

              {/* Actions */}
              <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Was this helpful?</span>
                  <button
                    onClick={() => setRating('up')}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: rating === 'up' ? '#10b981' : '#94a3b8', padding: 0 }}
                  ><ThumbsUp size={14} /></button>
                  <button
                    onClick={() => setRating('down')}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: rating === 'down' ? '#ef4444' : '#94a3b8', padding: 0 }}
                  ><ThumbsDown size={14} /></button>
                </div>
                <button
                  onClick={() => onPractice(q)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.375rem',
                    padding: '0.5rem 1rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer',
                    background: '#6366f1', color: '#fff', fontSize: '0.8rem', fontWeight: 600,
                  }}
                >
                  <Mic size={13} /> Practice This
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function PracticeModal({ question, onClose }) {
  const [recording, setRecording] = useState(false);
  const [answer, setAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);

  if (submitted) {
    return (
      <div style={overlayStyle}>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          style={{ ...modalStyle, textAlign: 'center', padding: '2.5rem' }}
        >
          <CheckCircle size={48} color="#10b981" style={{ marginBottom: '1rem' }} />
          <h2 style={{ margin: '0 0 0.5rem', color: '#0f172a', fontSize: '1.5rem' }}>Answer Submitted!</h2>
          <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>Your answer has been recorded. Keep practicing to improve your confidence!</p>
          <div style={{ background: '#f8fafc', borderRadius: '0.75rem', padding: '1rem', marginBottom: '1.5rem', textAlign: 'left' }}>
            <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6366f1', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Your Answer</p>
            <p style={{ margin: 0, fontSize: '0.875rem', color: '#334155', lineHeight: 1.6 }}>{answer}</p>
          </div>
          <button onClick={onClose} style={{ ...primaryBtnStyle, width: '100%', justifyContent: 'center' }}>
            Done
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={overlayStyle}>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        style={modalStyle}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}>
              <ArrowLeft size={18} />
            </button>
            <h3 style={{ margin: 0, fontSize: '1rem', color: '#0f172a' }}>Practice Mode</h3>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.8rem', color: '#f59e0b', fontWeight: 600 }}>
            <Clock size={14} /> {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
          </div>
        </div>

        {/* Question */}
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '0.75rem', padding: '1rem', marginBottom: '1.25rem' }}>
          <p style={{ margin: 0, fontSize: '0.9rem', color: '#0f172a', fontWeight: 500, lineHeight: 1.6 }}>{question.question}</p>
        </div>

        {/* Voice toggle */}
        <button
          onClick={() => setRecording((r) => !r)}
          style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.6rem 1rem', borderRadius: '0.5rem', border: '1px solid',
            cursor: 'pointer', marginBottom: '1rem', fontSize: '0.85rem',
            background: recording ? '#fef2f2' : '#f8fafc',
            borderColor: recording ? '#ef4444' : '#e2e8f0',
            color: recording ? '#ef4444' : '#334155',
          }}
        >
          {recording ? <MicOff size={16} /> : <Mic size={16} />}
          {recording ? 'Stop Recording' : 'Record Voice Answer'}
        </button>

        {/* Text answer */}
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Type your answer here..."
          rows={5}
          style={{
            width: '100%', padding: '0.875rem', borderRadius: '0.75rem',
            border: '1px solid #e2e8f0', fontSize: '0.875rem', resize: 'vertical',
            color: '#334155', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box',
          }}
        />

        <button
          disabled={!answer.trim()}
          onClick={() => setSubmitted(true)}
          style={{
            ...primaryBtnStyle, width: '100%', justifyContent: 'center',
            marginTop: '1rem', opacity: answer.trim() ? 1 : 0.5,
            cursor: answer.trim() ? 'pointer' : 'not-allowed',
          }}
        >
          <Send size={15} /> Submit Answer
        </button>
      </motion.div>
    </div>
  );
}

/* ─── Shared styles ──────────────────────────────────────────── */
const overlayStyle = {
  position: 'fixed', inset: 0, zIndex: 1000,
  background: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(4px)',
  display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem',
};
const modalStyle = {
  background: '#fff', borderRadius: '1.25rem', padding: '1.75rem',
  width: '100%', maxWidth: '540px', maxHeight: '90vh', overflow: 'auto',
  boxShadow: '0 25px 60px rgba(0,0,0,0.18)',
};
const primaryBtnStyle = {
  display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.25rem',
  borderRadius: '0.5rem', border: 'none', cursor: 'pointer',
  background: '#6366f1', color: '#fff', fontSize: '0.875rem', fontWeight: 600,
};

/* ─── Main Page ──────────────────────────────────────────────── */
export default function HRQuestions() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [difficulty, setDifficulty] = useState('All');
  const [showBookmarked, setShowBookmarked] = useState(false);
  const [practiceQuestion, setPracticeQuestion] = useState(null);
  const [bookmarked] = useState(new Set(HR_QUESTIONS.filter((q) => q.starred).map((q) => q.id)));

  const filtered = HR_QUESTIONS.filter((q) => {
    const matchSearch = q.question.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === 'All' || q.category === activeCategory;
    const matchDiff = difficulty === 'All' || q.difficulty === difficulty;
    const matchBookmark = !showBookmarked || bookmarked.has(q.id);
    return matchSearch && matchCat && matchDiff && matchBookmark;
  });

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: 'ui-sans-serif, system-ui, sans-serif' }}>
      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
        padding: '3rem 2rem 5rem', color: '#fff', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.06, backgroundImage: 'repeating-linear-gradient(transparent, transparent 40px, #fff 41px)' }} />
        <div style={{ maxWidth: '960px', margin: '0 auto', position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.15)', padding: '0.375rem 0.875rem', borderRadius: '999px', marginBottom: '1rem', fontSize: '0.8rem', fontWeight: 600 }}>
            <Star size={13} /> HR Question Bank
          </div>
          <h1 style={{ margin: '0 0 0.75rem', fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontWeight: 700, lineHeight: 1.2 }}>
            Master Your HR Interview
          </h1>
          <p style={{ margin: 0, opacity: 0.85, fontSize: '1rem', maxWidth: '540px', lineHeight: 1.6 }}>
            Practise the most common HR & behavioural questions with sample answers, pro tips, and voice practice mode.
          </p>
          <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            {[
              { label: 'Questions', value: HR_QUESTIONS.length },
              { label: 'Categories', value: CATEGORIES.length - 1 },
              { label: 'Voice Practice', value: '✓' },
            ].map((s) => (
              <div key={s.label}>
                <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700 }}>{s.value}</p>
                <p style={{ margin: 0, opacity: 0.7, fontSize: '0.8rem' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Search + Filter Bar */}
      <div style={{ maxWidth: '960px', margin: '-2rem auto 0', padding: '0 1rem', position: 'relative', zIndex: 10 }}>
        <div style={{ background: '#fff', borderRadius: '1rem', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', padding: '1.25rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ flex: 1, minWidth: '200px', position: 'relative' }}>
            <Search size={15} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input
              value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Search questions..."
              style={{
                width: '100%', padding: '0.6rem 0.75rem 0.6rem 2.25rem', borderRadius: '0.5rem',
                border: '1px solid #e2e8f0', fontSize: '0.875rem', color: '#334155',
                outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit',
              }}
            />
          </div>

          <select
            value={difficulty} onChange={(e) => setDifficulty(e.target.value)}
            style={{ padding: '0.6rem 0.75rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0', fontSize: '0.875rem', color: '#334155', cursor: 'pointer', background: '#fff' }}
          >
            {['All', 'Easy', 'Medium', 'Hard'].map((d) => <option key={d}>{d}</option>)}
          </select>

          <button
            onClick={() => setShowBookmarked((b) => !b)}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.375rem', padding: '0.6rem 1rem',
              borderRadius: '0.5rem', border: '1px solid', cursor: 'pointer', fontSize: '0.875rem',
              background: showBookmarked ? '#fef9ec' : '#fff',
              borderColor: showBookmarked ? '#f59e0b' : '#e2e8f0',
              color: showBookmarked ? '#f59e0b' : '#334155',
            }}
          >
            <Bookmark size={14} fill={showBookmarked ? '#f59e0b' : 'none'} />
            Saved
          </button>

          <button
            onClick={() => { setSearch(''); setActiveCategory('All'); setDifficulty('All'); setShowBookmarked(false); }}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: '0.4rem' }}
            title="Reset filters"
          >
            <RefreshCw size={15} />
          </button>
        </div>
      </div>

      {/* Category tabs */}
      <div style={{ maxWidth: '960px', margin: '1.5rem auto 0', padding: '0 1rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                flexShrink: 0, padding: '0.45rem 1rem', borderRadius: '999px', border: '1px solid',
                cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600, whiteSpace: 'nowrap', transition: 'all 0.2s',
                background: activeCategory === cat ? '#6366f1' : '#fff',
                borderColor: activeCategory === cat ? '#6366f1' : '#e2e8f0',
                color: activeCategory === cat ? '#fff' : '#475569',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Question List */}
      <div style={{ maxWidth: '960px', margin: '1.5rem auto 3rem', padding: '0 1rem' }}>
        <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '1rem' }}>
          Showing <strong style={{ color: '#334155' }}>{filtered.length}</strong> question{filtered.length !== 1 ? 's' : ''}
        </p>

        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>
            <Filter size={36} style={{ marginBottom: '0.75rem', opacity: 0.4 }} />
            <p style={{ margin: 0 }}>No questions match your filters. Try adjusting your search.</p>
          </div>
        ) : (
          filtered.map((q) => (
            <QuestionCard key={q.id} q={q} onPractice={setPracticeQuestion} />
          ))
        )}
      </div>

      {/* Practice Modal */}
      <AnimatePresence>
        {practiceQuestion && (
          <PracticeModal question={practiceQuestion} onClose={() => setPracticeQuestion(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
