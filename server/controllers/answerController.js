const Answer = require('../models/Answer');
const Question = require('../models/Question');
const { evaluateAnswer } = require('../services/aiService');

// @desc    Submit an answer for evaluation
// @route   POST /api/answers
// @access  Private
const submitAnswer = async (req, res) => {
  const { questionId, answerText, sessionId, timeTaken } = req.body;

  if (!questionId || !answerText) {
    return res.status(400).json({ success: false, message: 'Question ID and answer text are required' });
  }

  const question = await Question.findById(questionId);
  if (!question) {
    return res.status(404).json({ success: false, message: 'Question not found' });
  }

  // AI evaluation
  const evaluation = await evaluateAnswer(question.text, answerText, question.category);

  const answer = await Answer.create({
    user: req.user._id,
    question: questionId,
    session: sessionId || null,
    answerText,
    scores: evaluation.scores,
    aiFeedback: evaluation.aiFeedback,
    timeTaken: timeTaken || 0,
    isSubmitted: true,
  });

  res.status(201).json({
    success: true,
    message: 'Answer submitted and evaluated',
    answer,
  });
};

// @desc    Get all answers submitted by the logged-in user
// @route   GET /api/answers/my
// @access  Private
const getMyAnswers = async (req, res) => {
  const { category, page = 1, limit = 10 } = req.query;

  const filter = { user: req.user._id };
  const skip = (Number(page) - 1) * Number(limit);

  let answers = await Answer.find(filter)
    .populate('question', 'text category difficulty')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(Number(limit));

  if (category) {
    answers = answers.filter((a) => a.question?.category === category);
  }

  const total = await Answer.countDocuments(filter);

  res.json({
    success: true,
    total,
    page: Number(page),
    totalPages: Math.ceil(total / Number(limit)),
    answers,
  });
};

// @desc    Get a single answer by ID
// @route   GET /api/answers/:id
// @access  Private
const getAnswerById = async (req, res) => {
  const answer = await Answer.findOne({ _id: req.params.id, user: req.user._id }).populate(
    'question',
    'text category difficulty idealAnswer'
  );

  if (!answer) {
    return res.status(404).json({ success: false, message: 'Answer not found' });
  }

  res.json({ success: true, answer });
};

// @desc    Get aggregated score stats for the logged-in user
// @route   GET /api/answers/stats
// @access  Private
const getStats = async (req, res) => {
  const answers = await Answer.find({ user: req.user._id, isSubmitted: true });

  if (answers.length === 0) {
    return res.json({ success: true, stats: { totalAnswers: 0, averageScore: 0 } });
  }

  const totalAnswers = answers.length;
  const averageScore = (answers.reduce((sum, a) => sum + a.scores.overall, 0) / totalAnswers).toFixed(1);
  const bestScore = Math.max(...answers.map((a) => a.scores.overall));

  res.json({
    success: true,
    stats: { totalAnswers, averageScore: Number(averageScore), bestScore },
  });
};

module.exports = { submitAnswer, getMyAnswers, getAnswerById, getStats };
