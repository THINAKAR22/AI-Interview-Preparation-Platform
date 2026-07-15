const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    fileUrl: {
      type: String,
      required: true,
    },
    fileSize: {
      type: Number, // in bytes
    },
    parsedText: {
      type: String,
      default: '',
    },
    analysis: {
      overallScore: { type: Number, default: 0, min: 0, max: 100 },
      atsScore: { type: Number, default: 0, min: 0, max: 100 },
      strengths: [{ type: String }],
      weaknesses: [{ type: String }],
      suggestions: [{ type: String }],
      keywords: [{ type: String }],
      missingKeywords: [{ type: String }],
      summary: { type: String, default: '' },
    },
    sections: {
      hasContactInfo: { type: Boolean, default: false },
      hasEducation: { type: Boolean, default: false },
      hasExperience: { type: Boolean, default: false },
      hasSkills: { type: Boolean, default: false },
      hasProjects: { type: Boolean, default: false },
      hasSummary: { type: Boolean, default: false },
    },
    isAnalyzed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Resume', resumeSchema);
