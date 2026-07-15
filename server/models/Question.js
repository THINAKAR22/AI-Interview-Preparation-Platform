const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, 'Question text is required'],
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['DSA', 'System Design', 'HR', 'Behavioral', 'SQL', 'Frontend', 'Backend', 'Full Stack'],
    },
    difficulty: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard'],
      default: 'Medium',
    },
    type: {
      type: String,
      enum: ['Technical', 'Behavioral', 'HR', 'Coding'],
      default: 'Technical',
    },
    tags: [{ type: String }],
    hints: [{ type: String }],
    idealAnswer: {
      type: String,
      default: '',
    },
    timeLimit: {
      type: Number, // in seconds
      default: 180,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Question', questionSchema);
