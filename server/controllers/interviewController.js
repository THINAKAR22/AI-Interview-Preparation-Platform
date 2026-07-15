const mongoose = require('mongoose');
const Question = require('../models/Question');
const Answer = require('../models/Answer');
const User = require('../models/User');
const { generateQuestions } = require('../services/aiService');

// ─── Interview Session Schema (inline, no separate model needed) ───────────
// A lightweight document stored against User; can be extracted to a model later.

const interviewSessionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  role: String,
  experience: String,
  category: String,
  difficulty: String,
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
  answers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Answer' }],
  status: { type: String, enum: ['active', 'completed', 'abandoned'], default: 'active' },
  overallScore: { type: Number, default: 0 },
  startedAt: { type: Date, default: Date.now },
  completedAt: Date,
}, { timestamps: true });

const InterviewSession = mongoose.models.InterviewSession ||
  mongoose.model('InterviewSession', interviewSessionSchema);

// @desc    Start a new mock interview session
// @route   POST /api/interviews/start
// @access  Private
const startInterview = async (req, res) => {
  const { role = 'Software Engineer', experience = 'Fresher', category = 'Technical', difficulty = 'Medium', numQuestions = 5 } = req.body;

  // Fetch questions from DB matching criteria
  let questions = await Question.find({ category, difficulty }).limit(Number(numQuestions));

  // If DB doesn't have enough questions, generate AI questions
  if (questions.length < Number(numQuestions)) {
    const aiQuestions = await generateQuestions(role, category, difficulty, Number(numQuestions) - questions.length);
    const created = await Question.insertMany(
      aiQuestions.map((text) => ({ text, category, difficulty, type: 'Technical' }))
    );
    questions = [...questions, ...created];
  }

  const session = await InterviewSession.create({
    user: req.user._id,
    role, experience, category, difficulty,
    questions: questions.map((q) => q._id),
  });

  // Update user's total sessions
  await User.findByIdAndUpdate(req.user._id, { $inc: { totalSessions: 1 } });

  res.status(201).json({
    success: true,
    message: 'Interview session started',
    session: {
      _id: session._id,
      role, experience, category, difficulty,
      questions: questions.map((q) => ({ _id: q._id, text: q.text, timeLimit: q.timeLimit })),
    },
  });
};

// @desc    Complete an interview session and calculate final score
// @route   PUT /api/interviews/:id/complete
// @access  Private
const completeInterview = async (req, res) => {
  const session = await InterviewSession.findOne({ _id: req.params.id, user: req.user._id });
  if (!session) {
    return res.status(404).json({ success: false, message: 'Session not found' });
  }

  // Gather all answers for this session
  const answers = await Answer.find({ session: session._id, user: req.user._id });
  const overallScore = answers.length
    ? Math.round(answers.reduce((sum, a) => sum + a.scores.overall, 0) / answers.length)
    : 0;

  session.status = 'completed';
  session.completedAt = new Date();
  session.overallScore = overallScore;
  session.answers = answers.map((a) => a._id);
  await session.save();

  // Update user average score
  const user = await User.findById(req.user._id);
  const prevTotal = user.averageScore * (user.totalSessions - 1);
  user.averageScore = Math.round((prevTotal + overallScore) / user.totalSessions);
  await user.save();

  res.json({
    success: true,
    message: 'Interview completed',
    result: { sessionId: session._id, overallScore, totalAnswers: answers.length },
  });
};

// @desc    Get all sessions for the logged-in user
// @route   GET /api/interviews/my
// @access  Private
const getMySessions = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (Number(page) - 1) * Number(limit);

  const sessions = await InterviewSession.find({ user: req.user._id })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(Number(limit))
    .populate('questions', 'text category');

  const total = await InterviewSession.countDocuments({ user: req.user._id });

  res.json({
    success: true,
    total,
    page: Number(page),
    totalPages: Math.ceil(total / Number(limit)),
    sessions,
  });
};

// @desc    Get a single session by ID with full details
// @route   GET /api/interviews/:id
// @access  Private
const getSessionById = async (req, res) => {
  const session = await InterviewSession.findOne({ _id: req.params.id, user: req.user._id })
    .populate('questions', 'text category difficulty')
    .populate({ path: 'answers', populate: { path: 'question', select: 'text' } });

  if (!session) {
    return res.status(404).json({ success: false, message: 'Session not found' });
  }

  res.json({ success: true, session });
};

// @desc    Fetch practice questions (no session required)
// @route   GET /api/interviews/questions
// @access  Private
const getPracticeQuestions = async (req, res) => {
  const { category, difficulty, limit = 10 } = req.query;

  const filter = {};
  if (category) filter.category = category;
  if (difficulty) filter.difficulty = difficulty;

  const questions = await Question.find(filter).limit(Number(limit)).sort({ createdAt: -1 });

  res.json({ success: true, count: questions.length, questions });
};

module.exports = { startInterview, completeInterview, getMySessions, getSessionById, getPracticeQuestions };
