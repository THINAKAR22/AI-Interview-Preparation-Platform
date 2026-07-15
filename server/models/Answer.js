const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
      required: true,
    },
    session: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Interview',
    },
    answerText: {
      type: String,
      required: true,
      trim: true,
    },
    audioUrl: {
      type: String,
      default: '',
    },
    scores: {
      overall: { type: Number, default: 0, min: 0, max: 100 },
      technical: { type: Number, default: 0, min: 0, max: 100 },
      communication: { type: Number, default: 0, min: 0, max: 100 },
      confidence: { type: Number, default: 0, min: 0, max: 100 },
      relevance: { type: Number, default: 0, min: 0, max: 100 },
    },
    aiFeedback: {
      strengths: [{ type: String }],
      improvements: [{ type: String }],
      summary: { type: String, default: '' },
    },
    timeTaken: {
      type: Number, // in seconds
      default: 0,
    },
    isSubmitted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Answer', answerSchema);
