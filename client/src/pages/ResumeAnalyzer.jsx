import React, { useState, useRef } from 'react';
import './ResumeAnalyzer.css';
import { 
  FaUpload, FaFilePdf, FaFileWord, FaFileAlt, 
  FaCheckCircle, FaExclamationCircle, FaInfoCircle,
  FaChartLine, FaLightbulb, FaDownload, FaTrash,
  FaSpinner, FaEye, FaStar, FaUserCheck, FaBriefcase,
  FaGraduationCap, FaTools, FaAward, FaLanguage,
  FaLinkedin, FaGithub, FaTwitter, FaEnvelope,
  FaPhone, FaMapMarkerAlt, FaCalendarAlt
} from 'react-icons/fa';

const ResumeAnalyzer = () => {
  const [file, setFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [selectedTab, setSelectedTab] = useState('overview');
  const fileInputRef = useRef(null);

  // Sample analysis data (will be replaced with actual AI analysis)
  const sampleAnalysis = {
    score: 78,
    overallRating: 'Good',
    sections: {
      summary: 85,
      experience: 70,
      education: 90,
      skills: 75,
      projects: 65,
      achievements: 60
    },
    strengths: [
      'Strong technical skills in React and JavaScript',
      'Good academic background',
      'Clear project descriptions'
    ],
    improvements: [
      'Add more quantifiable achievements',
      'Improve summary section with career goals',
      'Include more relevant keywords for ATS',
      'Add professional certifications'
    ],
    keywords: {
      present: ['React', 'JavaScript', 'HTML', 'CSS', 'Node.js', 'MongoDB'],
      missing: ['TypeScript', 'AWS', 'Docker', 'CI/CD', 'Agile', 'Scrum']
    },
    atsScore: 72,
    readabilityScore: 85,
    formatScore: 80,
    suggestions: [
      {
        section: 'Summary',
        suggestion: 'Add specific career objectives and key achievements',
        priority: 'High'
      },
      {
        section: 'Experience',
        suggestion: 'Use action verbs and quantify achievements with numbers',
        priority: 'High'
      },
      {
        section: 'Skills',
        suggestion: 'Categorize skills and add proficiency levels',
        priority: 'Medium'
      },
      {
        section: 'Projects',
        suggestion: 'Link to live demos and GitHub repositories',
        priority: 'Medium'
      }
    ],
    contactInfo: {
      name: 'John Doe',
      email: 'john.doe@email.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      linkedin: 'linkedin.com/in/johndoe',
      github: 'github.com/johndoe'
    },
    jobFit: {
      role: 'Full Stack Developer',
      match: 82,
      skillsMatch: ['React', 'JavaScript', 'Node.js'],
      missingSkills: ['TypeScript', 'AWS']
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      handleFileUpload(file);
    }
  };

  const handleFileUpload = (selectedFile) => {
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    
    if (!allowedTypes.includes(selectedFile.type)) {
      alert('Please upload a PDF or Word document');
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      alert('File size should be less than 5MB');
      return;
    }

    setFile(selectedFile);
    // Start analysis
    analyzeResume(selectedFile);
  };

  const analyzeResume = async (file) => {
    setIsAnalyzing(true);
    // Simulate API call
    setTimeout(() => {
      setAnalysisResult(sampleAnalysis);
      setIsAnalyzing(false);
    }, 3000);
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const clearFile = () => {
    setFile(null);
    setAnalysisResult(null);
    setSelectedTab('overview');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const downloadReport = () => {
    // Generate and download report
    alert('Downloading report...');
  };

  const getScoreColor = (score) => {
    if (score >= 80) return '#4CAF50';
    if (score >= 60) return '#FFA726';
    return '#EF5350';
  };

  const getPriorityBadge = (priority) => {
    const colors = {
      'High': '#EF5350',
      'Medium': '#FFA726',
      'Low': '#4CAF50'
    };
    return <span className="priority-badge" style={{ backgroundColor: colors[priority] }}>{priority}</span>;
  };

  return (
    <div className="resume-analyzer-container">
      {/* Header */}
      <div className="analyzer-header">
        <h1>Resume Analyzer</h1>
        <p>Upload your resume and get AI-powered analysis to improve your chances</p>
      </div>

      {/* Upload Section */}
      {!file ? (
        <div 
          className={`upload-section ${dragActive ? 'drag-active' : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="upload-content">
            <div className="upload-icon">
              <FaUpload />
            </div>
            <h3>Drop your resume here</h3>
            <p>or click to browse files</p>
            <div className="file-types">
              <span><FaFilePdf /> PDF</span>
              <span><FaFileWord /> DOC/DOCX</span>
            </div>
            <button 
              className="upload-btn"
              onClick={() => fileInputRef.current?.click()}
            >
              Choose File
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileInput}
              style={{ display: 'none' }}
            />
            <div className="upload-info">
              <FaInfoCircle />
              <span>Maximum file size: 5MB</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="analysis-view">
          {/* File Info Bar */}
          <div className="file-info-bar">
            <div className="file-info">
              <FaFilePdf className="file-icon" />
              <div className="file-details">
                <span className="file-name">{file.name}</span>
                <span className="file-size">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
              </div>
            </div>
            <div className="file-actions">
              <button className="change-file-btn" onClick={clearFile}>
                <FaTrash /> Remove
              </button>
            </div>
          </div>

          {/* Loading State */}
          {isAnalyzing ? (
            <div className="loading-container">
              <FaSpinner className="spinner" />
              <h3>Analyzing your resume...</h3>
              <p>This may take a few moments</p>
            </div>
          ) : (
            analysisResult && (
              <div className="analysis-content">
                {/* Score Overview */}
                <div className="score-overview">
                  <div className="main-score">
                    <div className="score-circle" style={{
                      background: `conic-gradient(${getScoreColor(analysisResult.score)} ${analysisResult.score}%, #e0e5ec ${analysisResult.score}%)`
                    }}>
                      <span className="score-number">{analysisResult.score}%</span>
                    </div>
                    <div className="score-details">
                      <h2>{analysisResult.overallRating}</h2>
                      <p>Overall Resume Score</p>
                      <div className="score-breakdown">
                        <span>ATS Score: {analysisResult.atsScore}%</span>
                        <span>Readability: {analysisResult.readabilityScore}%</span>
                        <span>Format: {analysisResult.formatScore}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tabs */}
                <div className="analysis-tabs">
                  <button 
                    className={`tab-btn ${selectedTab === 'overview' ? 'active' : ''}`}
                    onClick={() => setSelectedTab('overview')}
                  >
                    <FaChartLine /> Overview
                  </button>
                  <button 
                    className={`tab-btn ${selectedTab === 'strengths' ? 'active' : ''}`}
                    onClick={() => setSelectedTab('strengths')}
                  >
                    <FaCheckCircle /> Strengths
                  </button>
                  <button 
                    className={`tab-btn ${selectedTab === 'improvements' ? 'active' : ''}`}
                    onClick={() => setSelectedTab('improvements')}
                  >
                    <FaLightbulb /> Improvements
                  </button>
                  <button 
                    className={`tab-btn ${selectedTab === 'keywords' ? 'active' : ''}`}
                    onClick={() => setSelectedTab('keywords')}
                  >
                    <FaTools /> Keywords
                  </button>
                  <button 
                    className={`tab-btn ${selectedTab === 'suggestions' ? 'active' : ''}`}
                    onClick={() => setSelectedTab('suggestions')}
                  >
                    <FaInfoCircle /> Suggestions
                  </button>
                  <button 
                    className={`tab-btn ${selectedTab === 'job-fit' ? 'active' : ''}`}
                    onClick={() => setSelectedTab('job-fit')}
                  >
                    <FaUserCheck /> Job Fit
                  </button>
                </div>

                {/* Tab Content */}
                <div className="tab-content">
                  {selectedTab === 'overview' && (
                    <div className="overview-tab">
                      <div className="overview-grid">
                        <div className="overview-card">
                          <h4>Section Scores</h4>
                          <div className="section-scores">
                            {Object.entries(analysisResult.sections).map(([section, score]) => (
                              <div key={section} className="section-score-item">
                                <span className="section-name">{section.charAt(0).toUpperCase() + section.slice(1)}</span>
                                <div className="section-score-bar">
                                  <div className="section-score-fill" style={{ 
                                    width: `${score}%`,
                                    backgroundColor: getScoreColor(score)
                                  }} />
                                </div>
                                <span className="section-score-value">{score}%</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="overview-card">
                          <h4>Contact Information</h4>
                          <div className="contact-info">
                            <p><FaUserCheck /> {analysisResult.contactInfo.name}</p>
                            <p><FaEnvelope /> {analysisResult.contactInfo.email}</p>
                            <p><FaPhone /> {analysisResult.contactInfo.phone}</p>
                            <p><FaMapMarkerAlt /> {analysisResult.contactInfo.location}</p>
                            <p><FaLinkedin /> {analysisResult.contactInfo.linkedin}</p>
                            <p><FaGithub /> {analysisResult.contactInfo.github}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedTab === 'strengths' && (
                    <div className="strengths-tab">
                      <div className="strengths-list">
                        {analysisResult.strengths.map((strength, index) => (
                          <div key={index} className="strength-item">
                            <FaCheckCircle className="strength-icon" />
                            <span>{strength}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedTab === 'improvements' && (
                    <div className="improvements-tab">
                      <div className="improvements-list">
                        {analysisResult.improvements.map((improvement, index) => (
                          <div key={index} className="improvement-item">
                            <FaExclamationCircle className="improvement-icon" />
                            <span>{improvement}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedTab === 'keywords' && (
                    <div className="keywords-tab">
                      <div className="keywords-grid">
                        <div className="keywords-present">
                          <h4>✅ Present Keywords</h4>
                          <div className="keyword-tags">
                            {analysisResult.keywords.present.map((keyword, index) => (
                              <span key={index} className="keyword-tag present">{keyword}</span>
                            ))}
                          </div>
                        </div>
                        <div className="keywords-missing">
                          <h4>❌ Missing Keywords</h4>
                          <div className="keyword-tags">
                            {analysisResult.keywords.missing.map((keyword, index) => (
                              <span key={index} className="keyword-tag missing">{keyword}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedTab === 'suggestions' && (
                    <div className="suggestions-tab">
                      {analysisResult.suggestions.map((suggestion, index) => (
                        <div key={index} className="suggestion-item">
                          <div className="suggestion-header">
                            <h4>{suggestion.section}</h4>
                            {getPriorityBadge(suggestion.priority)}
                          </div>
                          <p>{suggestion.suggestion}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {selectedTab === 'job-fit' && (
                    <div className="job-fit-tab">
                      <div className="job-fit-card">
                        <h3>Job Fit Analysis</h3>
                        <div className="job-fit-score">
                          <div className="match-circle">
                            <span>{analysisResult.jobFit.match}%</span>
                          </div>
                          <div className="match-details">
                            <p><strong>Role:</strong> {analysisResult.jobFit.role}</p>
                            <p><strong>Skills Match:</strong></p>
                            <div className="match-skills">
                              {analysisResult.jobFit.skillsMatch.map((skill, index) => (
                                <span key={index} className="match-skill present">{skill}</span>
                              ))}
                              {analysisResult.jobFit.missingSkills.map((skill, index) => (
                                <span key={index} className="match-skill missing">{skill}</span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="analysis-actions">
                  <button className="action-btn download" onClick={downloadReport}>
                    <FaDownload /> Download Report
                  </button>
                  <button className="action-btn share">
                    <FaShare /> Share Feedback
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default ResumeAnalyzer;