const Resume = require('../models/Resume');
const { analyzeResume } = require('../services/aiService');
const path = require('path');
const fs = require('fs');

// @desc    Upload and analyze a resume
// @route   POST /api/resumes/upload
// @access  Private
const uploadResume = async (req, res) => {
  // In production, use multer middleware and cloud storage (S3, Cloudinary, etc.)
  // This controller expects the file metadata to come through req.body for now.
  const { fileName, fileUrl, fileSize, parsedText, targetRole } = req.body;

  if (!fileName || !fileUrl) {
    return res.status(400).json({ success: false, message: 'File name and URL are required' });
  }

  // AI resume analysis
  const analysisResult = await analyzeResume(parsedText || '', targetRole || 'Software Engineer');

  const resume = await Resume.create({
    user: req.user._id,
    fileName,
    fileUrl,
    fileSize: fileSize || 0,
    parsedText: parsedText || '',
    analysis: analysisResult,
    sections: {
      hasContactInfo: /email|phone|address/i.test(parsedText || ''),
      hasEducation: /education|university|degree|bachelor|master/i.test(parsedText || ''),
      hasExperience: /experience|work|internship|job/i.test(parsedText || ''),
      hasSkills: /skills|technologies|stack/i.test(parsedText || ''),
      hasProjects: /project|github|portfolio/i.test(parsedText || ''),
      hasSummary: /summary|objective|about/i.test(parsedText || ''),
    },
    isAnalyzed: true,
  });

  res.status(201).json({
    success: true,
    message: 'Resume uploaded and analyzed',
    resume,
  });
};

// @desc    Get all resumes for the logged-in user
// @route   GET /api/resumes/my
// @access  Private
const getMyResumes = async (req, res) => {
  const resumes = await Resume.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json({ success: true, count: resumes.length, resumes });
};

// @desc    Get a single resume analysis by ID
// @route   GET /api/resumes/:id
// @access  Private
const getResumeById = async (req, res) => {
  const resume = await Resume.findOne({ _id: req.params.id, user: req.user._id });
  if (!resume) {
    return res.status(404).json({ success: false, message: 'Resume not found' });
  }
  res.json({ success: true, resume });
};

// @desc    Re-analyze an existing resume
// @route   POST /api/resumes/:id/reanalyze
// @access  Private
const reanalyzeResume = async (req, res) => {
  const { targetRole } = req.body;
  const resume = await Resume.findOne({ _id: req.params.id, user: req.user._id });

  if (!resume) {
    return res.status(404).json({ success: false, message: 'Resume not found' });
  }

  const analysisResult = await analyzeResume(resume.parsedText, targetRole || 'Software Engineer');

  resume.analysis = analysisResult;
  resume.isAnalyzed = true;
  await resume.save();

  res.json({ success: true, message: 'Resume reanalyzed successfully', resume });
};

// @desc    Delete a resume
// @route   DELETE /api/resumes/:id
// @access  Private
const deleteResume = async (req, res) => {
  const resume = await Resume.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  if (!resume) {
    return res.status(404).json({ success: false, message: 'Resume not found' });
  }
  res.json({ success: true, message: 'Resume deleted successfully' });
};

module.exports = { uploadResume, getMyResumes, getResumeById, reanalyzeResume, deleteResume };
