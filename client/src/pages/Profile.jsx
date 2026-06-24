import React, { useState, useEffect } from 'react';
import './Profile.css';

const Profile = () => {
  const [userData, setUserData] = useState({
    name: 'Thinakar',
    email: 'Thinakar46@gmail.com',
    role: 'Full Stack Developer',
    targetRole: 'Senior Software Engineer',
    experience: '4 years',
    location: 'Chennai, India',
    bio: 'Passionate developer preparing for FAANG-level interviews. Focused on mastering DSA, System Design, and Behavioral interviews.',
    interviewStats: {
      totalInterviews: 28,
      completed: 18,
      pending: 10,
      averageScore: 76,
      improvementRate: '+12%',
      strongAreas: ['Data Structures', 'Algorithms', 'JavaScript'],
      weakAreas: ['System Design', 'Dynamic Programming']
    },
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS', 'Docker', 'TypeScript', 'MongoDB', 'GraphQL'],
    targetCompanies: ['Google', 'Microsoft', 'Amazon', 'Meta'],
    education: [
      {
        id: 1,
        degree: 'M.Tech in Computer Science',
        institution: 'IIT Bombay',
        year: '2021',
        gpa: '8.2'
      },
      {
        id: 2,
        degree: 'B.E. in Information Technology',
        institution: 'NIT Trichy',
        year: '2019',
        gpa: '8.7'
      }
    ],
    experienceHistory: [
      {
        id: 1,
        title: 'Senior Software Engineer',
        company: 'Flipkart',
        period: '2022 - Present',
        description: 'Building scalable e-commerce microservices and leading the payment gateway integration team.'
      },
      {
        id: 2,
        title: 'Software Engineer',
        company: 'Paytm',
        period: '2020 - 2022',
        description: 'Developed features for digital wallet and UPI payments handling millions of transactions daily.'
      },
      {
        id: 3,
        title: 'Associate Developer',
        company: 'Infosys',
        period: '2019 - 2020',
        description: 'Full-stack development for enterprise applications using React and Spring Boot.'
      }
    ],
    certifications: [
      'AWS Certified Solutions Architect',
      'Google Cloud Professional',
      'Meta Backend Developer Certificate',
      'JavaScript Algorithms and Data Structures'
    ],
    interviewPreferences: {
      preferredLanguages: ['JavaScript', 'Python'],
      focusTopics: ['Data Structures', 'Algorithms', 'System Design'],
      interviewTime: 'Evening (6 PM - 9 PM)',
      notification: true,
      weeklyGoal: 3,
      mockInterviewReminders: true
    },
    recentInterviews: [
      {
        id: 1,
        type: 'Technical',
        topic: 'Data Structures & Algorithms',
        score: 82,
        date: '2026-06-23',
        feedback: 'Good problem-solving approach, needs improvement in optimization'
      },
      {
        id: 2,
        type: 'System Design',
        topic: 'Design Instagram',
        score: 65,
        date: '2026-06-20',
        feedback: 'Needs more work on scalability and database sharding'
      },
      {
        id: 3,
        type: 'Behavioral',
        topic: 'Leadership & Teamwork',
        score: 88,
        date: '2026-06-18',
        feedback: 'Excellent communication and STAR format responses'
      }
    ]
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [showInterviewInsights, setShowInterviewInsights] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    setEditData(userData);
  }, []);

  const handleEditToggle = () => {
    if (isEditing) {
      setUserData(editData);
      setIsEditing(false);
    } else {
      setIsEditing(true);
      setEditData(userData);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleArrayAdd = (field, item) => {
    if (item && item.trim()) {
      setEditData(prev => ({
        ...prev,
        [field]: [...prev[field], item.trim()]
      }));
    }
  };

  const handleArrayRemove = (field, itemToRemove) => {
    setEditData(prev => ({
      ...prev,
      [field]: prev[field].filter(item => item !== itemToRemove)
    }));
  };

  const handlePreferenceChange = (key, value) => {
    setEditData(prev => ({
      ...prev,
      interviewPreferences: {
        ...prev.interviewPreferences,
        [key]: value
      }
    }));
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'score-high';
    if (score >= 60) return 'score-medium';
    return 'score-low';
  };

  const getInitials = (name) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase();
  };

  return (
    <div className="profile-page">
      {/* Profile Header */}
      <div className="profile-header">
        <div className="profile-cover">
          <div className="profile-avatar">
            <div className="avatar-circle">
              <span className="avatar-text">{getInitials(userData.name)}</span>
            </div>
            <button className="edit-avatar-btn" title="Change Photo">
              <span className="camera-icon">📷</span>
            </button>
          </div>
        </div>
        <div className="profile-info">
          {isEditing ? (
            <div className="edit-form">
              <input
                type="text"
                name="name"
                value={editData.name}
                onChange={handleInputChange}
                className="edit-input"
                placeholder="Full Name"
              />
              <input
                type="email"
                name="email"
                value={editData.email}
                onChange={handleInputChange}
                className="edit-input"
                placeholder="Email"
              />
              <input
                type="text"
                name="role"
                value={editData.role}
                onChange={handleInputChange}
                className="edit-input"
                placeholder="Current Role"
              />
              <input
                type="text"
                name="targetRole"
                value={editData.targetRole}
                onChange={handleInputChange}
                className="edit-input"
                placeholder="Target Role"
              />
              <input
                type="text"
                name="experience"
                value={editData.experience}
                onChange={handleInputChange}
                className="edit-input"
                placeholder="Experience"
              />
              <input
                type="text"
                name="location"
                value={editData.location}
                onChange={handleInputChange}
                className="edit-input"
                placeholder="Location"
              />
              <textarea
                name="bio"
                value={editData.bio}
                onChange={handleInputChange}
                className="edit-textarea"
                placeholder="Bio"
                rows="3"
              />
            </div>
          ) : (
            <>
              <div className="profile-name-section">
                <div>
                  <h1 className="profile-name">{userData.name}</h1>
                  <span className="profile-role">{userData.role}</span>
                </div>
                <div className="target-role-badge">
                  🎯 {userData.targetRole}
                </div>
              </div>
              <div className="profile-details">
                <div className="detail-item">
                  <span className="detail-icon">📧</span>
                  <span className="detail-text">{userData.email}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-icon">💼</span>
                  <span className="detail-text">{userData.experience} experience</span>
                </div>
                <div className="detail-item">
                  <span className="detail-icon">📍</span>
                  <span className="detail-text">{userData.location}</span>
                </div>
              </div>
              <p className="profile-bio">{userData.bio}</p>
            </>
          )}
          <button className="edit-profile-btn" onClick={handleEditToggle}>
            {isEditing ? '💾 Save Changes' : '✏️ Edit Profile'}
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats-section">
        <div className="stat-card">
          <div className="stat-icon">🎤</div>
          <div className="stat-content">
            <h3>{userData.interviewStats.totalInterviews}</h3>
            <p>Total Interviews</p>
            <span className="stat-sub">{userData.interviewStats.completed} completed</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h3>{userData.interviewStats.averageScore}%</h3>
            <p>Average Score</p>
            <span className="stat-sub improvement">{userData.interviewStats.improvementRate}</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💪</div>
          <div className="stat-content">
            <h3>{userData.interviewStats.strongAreas.length}</h3>
            <p>Strong Areas</p>
            <span className="stat-sub">{userData.interviewStats.strongAreas.join(', ')}</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📚</div>
          <div className="stat-content">
            <h3>{userData.interviewStats.weakAreas.length}</h3>
            <p>Areas to Improve</p>
            <span className="stat-sub">{userData.interviewStats.weakAreas.join(', ')}</span>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="profile-tabs">
        <button 
          className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          📋 Overview
        </button>
        <button 
          className={`tab-btn ${activeTab === 'experience' ? 'active' : ''}`}
          onClick={() => setActiveTab('experience')}
        >
          💼 Experience
        </button>
        <button 
          className={`tab-btn ${activeTab === 'education' ? 'active' : ''}`}
          onClick={() => setActiveTab('education')}
        >
          🎓 Education
        </button>
        <button 
          className={`tab-btn ${activeTab === 'preferences' ? 'active' : ''}`}
          onClick={() => setActiveTab('preferences')}
        >
          ⚙️ Preferences
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="overview-tab">
            <div className="profile-grid">
              {/* Skills Section */}
              <div className="profile-section">
                <div className="section-header">
                  <h2>🛠️ Technical Skills</h2>
                  {isEditing && (
                    <button 
                      className="add-item-btn" 
                      onClick={() => {
                        const skill = prompt('Enter new skill:');
                        handleArrayAdd('skills', skill);
                      }}
                    >
                      + Add
                    </button>
                  )}
                </div>
                <div className="skills-container">
                  {(isEditing ? editData.skills : userData.skills).map((skill, index) => (
                    <div key={index} className="skill-tag">
                      {skill}
                      {isEditing && (
                        <button 
                          className="remove-item-btn" 
                          onClick={() => handleArrayRemove('skills', skill)}
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Target Companies */}
              <div className="profile-section">
                <div className="section-header">
                  <h2>🏢 Target Companies</h2>
                  {isEditing && (
                    <button 
                      className="add-item-btn" 
                      onClick={() => {
                        const company = prompt('Enter target company:');
                        handleArrayAdd('targetCompanies', company);
                      }}
                    >
                      + Add
                    </button>
                  )}
                </div>
                <div className="companies-container">
                  {(isEditing ? editData.targetCompanies : userData.targetCompanies).map((company, index) => (
                    <div key={index} className="company-tag">
                      <span className="company-icon">🏢</span>
                      {company}
                      {isEditing && (
                        <button 
                          className="remove-item-btn" 
                          onClick={() => handleArrayRemove('targetCompanies', company)}
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Interviews */}
              <div className="profile-section full-width">
                <div className="section-header">
                  <h2>📝 Recent Interview History</h2>
                  <button className="view-all-btn">View All →</button>
                </div>
                <div className="recent-interviews-list">
                  {userData.recentInterviews.map((interview) => (
                    <div key={interview.id} className="interview-item">
                      <div className="interview-header">
                        <div className="interview-type">
                          <span className="type-tag">{interview.type}</span>
                          <span className="interview-topic">{interview.topic}</span>
                        </div>
                        <div className={`interview-score ${getScoreColor(interview.score)}`}>
                          {interview.score}%
                        </div>
                      </div>
                      <div className="interview-meta">
                        <span className="interview-date">📅 {interview.date}</span>
                      </div>
                      <p className="interview-feedback">{interview.feedback}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div className="profile-section full-width">
                <div className="section-header">
                  <h2>🏆 Certifications</h2>
                  {isEditing && (
                    <button 
                      className="add-item-btn" 
                      onClick={() => {
                        const cert = prompt('Enter certification:');
                        handleArrayAdd('certifications', cert);
                      }}
                    >
                      + Add
                    </button>
                  )}
                </div>
                <div className="certifications-list">
                  {(isEditing ? editData.certifications : userData.certifications).map((cert, index) => (
                    <div key={index} className="certification-item">
                      <span className="cert-icon">✓</span>
                      <span>{cert}</span>
                      {isEditing && (
                        <button 
                          className="remove-item-btn" 
                          onClick={() => handleArrayRemove('certifications', cert)}
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Experience Tab */}
        {activeTab === 'experience' && (
          <div className="experience-tab">
            <div className="profile-section full-width">
              <div className="section-header">
                <h2>💼 Work Experience</h2>
              </div>
              <div className="experience-timeline">
                {(isEditing ? editData.experienceHistory : userData.experienceHistory).map((exp) => (
                  <div key={exp.id} className="experience-item">
                    <div className="experience-header">
                      <h3>{exp.title}</h3>
                      <span className="company">{exp.company}</span>
                    </div>
                    <span className="period">{exp.period}</span>
                    <p className="exp-description">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Education Tab */}
        {activeTab === 'education' && (
          <div className="education-tab">
            <div className="profile-section full-width">
              <div className="section-header">
                <h2>🎓 Education</h2>
              </div>
              <div className="education-list">
                {(isEditing ? editData.education : userData.education).map((edu) => (
                  <div key={edu.id} className="education-item">
                    <h3>{edu.degree}</h3>
                    <p className="institution">{edu.institution}</p>
                    <div className="education-meta">
                      <span className="edu-year">{edu.year}</span>
                      <span className="edu-gpa">GPA: {edu.gpa}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Preferences Tab */}
        {activeTab === 'preferences' && (
          <div className="preferences-tab">
            <div className="preferences-section">
              <h2>⚙️ Interview Preparation Preferences</h2>
              <div className="preferences-grid">
                <div className="preference-item">
                  <label>Preferred Languages</label>
                  {isEditing ? (
                    <div className="preference-tags">
                      {(editData.interviewPreferences.preferredLanguages || []).map((lang, idx) => (
                        <span key={idx} className="pref-tag">
                          {lang}
                          <button 
                            onClick={() => {
                              const newLangs = editData.interviewPreferences.preferredLanguages.filter(l => l !== lang);
                              setEditData(prev => ({
                                ...prev,
                                interviewPreferences: {
                                  ...prev.interviewPreferences,
                                  preferredLanguages: newLangs
                                }
                              }));
                            }}
                            className="remove-pref-btn"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                      {isEditing && (
                        <button 
                          className="add-pref-btn"
                          onClick={() => {
                            const lang = prompt('Add language:');
                            if (lang && lang.trim()) {
                              setEditData(prev => ({
                                ...prev,
                                interviewPreferences: {
                                  ...prev.interviewPreferences,
                                  preferredLanguages: [...prev.interviewPreferences.preferredLanguages, lang.trim()]
                                }
                              }));
                            }
                          }}
                        >
                          +
                        </button>
                      )}
                    </div>
                  ) : (
                    <span>{userData.interviewPreferences.preferredLanguages.join(', ')}</span>
                  )}
                </div>

                <div className="preference-item">
                  <label>Focus Topics</label>
                  {isEditing ? (
                    <div className="preference-tags">
                      {(editData.interviewPreferences.focusTopics || []).map((topic, idx) => (
                        <span key={idx} className="pref-tag topic">
                          {topic}
                          <button 
                            onClick={() => {
                              const newTopics = editData.interviewPreferences.focusTopics.filter(t => t !== topic);
                              setEditData(prev => ({
                                ...prev,
                                interviewPreferences: {
                                  ...prev.interviewPreferences,
                                  focusTopics: newTopics
                                }
                              }));
                            }}
                            className="remove-pref-btn"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                      {isEditing && (
                        <button 
                          className="add-pref-btn"
                          onClick={() => {
                            const topic = prompt('Add topic:');
                            if (topic && topic.trim()) {
                              setEditData(prev => ({
                                ...prev,
                                interviewPreferences: {
                                  ...prev.interviewPreferences,
                                  focusTopics: [...prev.interviewPreferences.focusTopics, topic.trim()]
                                }
                              }));
                            }
                          }}
                        >
                          +
                        </button>
                      )}
                    </div>
                  ) : (
                    <span>{userData.interviewPreferences.focusTopics.join(', ')}</span>
                  )}
                </div>

                <div className="preference-item">
                  <label>Weekly Goal</label>
                  {isEditing ? (
                    <input 
                      type="number"
                      value={editData.interviewPreferences.weeklyGoal}
                      onChange={(e) => handlePreferenceChange('weeklyGoal', parseInt(e.target.value) || 0)}
                      className="preference-input"
                      min="1"
                      max="7"
                    />
                  ) : (
                    <span>{userData.interviewPreferences.weeklyGoal} interviews/week</span>
                  )}
                </div>

                <div className="preference-item">
                  <label>Preferred Time</label>
                  {isEditing ? (
                    <select 
                      value={editData.interviewPreferences.interviewTime}
                      onChange={(e) => handlePreferenceChange('interviewTime', e.target.value)}
                      className="preference-select"
                    >
                      <option value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</option>
                      <option value="Afternoon (12 PM - 3 PM)">Afternoon (12 PM - 3 PM)</option>
                      <option value="Evening (6 PM - 9 PM)">Evening (6 PM - 9 PM)</option>
                      <option value="Night (9 PM - 12 AM)">Night (9 PM - 12 AM)</option>
                    </select>
                  ) : (
                    <span>{userData.interviewPreferences.interviewTime}</span>
                  )}
                </div>

                <div className="preference-item toggle">
                  <label>Notifications</label>
                  <div className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={isEditing ? editData.interviewPreferences.notification : userData.interviewPreferences.notification}
                      onChange={() => isEditing && handlePreferenceChange('notification', !editData.interviewPreferences.notification)}
                      className="toggle-input"
                      disabled={!isEditing}
                    />
                    <span className="toggle-slider"></span>
                  </div>
                </div>

                <div className="preference-item toggle">
                  <label>Mock Interview Reminders</label>
                  <div className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={isEditing ? editData.interviewPreferences.mockInterviewReminders : userData.interviewPreferences.mockInterviewReminders}
                      onChange={() => isEditing && handlePreferenceChange('mockInterviewReminders', !editData.interviewPreferences.mockInterviewReminders)}
                      className="toggle-input"
                      disabled={!isEditing}
                    />
                    <span className="toggle-slider"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* AI Insights Section */}
      <div className="ai-insights-section">
        <div className="insights-header">
          <h2>🤖 AI-Generated Insights</h2>
          <button 
            className="insights-toggle"
            onClick={() => setShowInterviewInsights(!showInterviewInsights)}
          >
            {showInterviewInsights ? 'Hide' : 'Show'} Insights
          </button>
        </div>
        {showInterviewInsights && (
          <div className="insights-grid">
            <div className="insight-card">
              <div className="insight-icon">🎯</div>
              <div className="insight-content">
                <h4>Focus Areas</h4>
                <p>Based on your recent performance, focus on:</p>
                <ul>
                  <li><span className="insight-tag urgent">System Design</span> - Need significant improvement</li>
                  <li><span className="insight-tag medium">Dynamic Programming</span> - Moderate improvement needed</li>
                  <li><span className="insight-tag good">Algorithms</span> - Keep up the good work!</li>
                </ul>
              </div>
            </div>
            <div className="insight-card">
              <div className="insight-icon">📈</div>
              <div className="insight-content">
                <h4>Recommended Schedule</h4>
                <ul>
                  <li>📅 <strong>Daily:</strong> 2 DSA problems</li>
                  <li>📅 <strong>Weekly:</strong> 1 System Design session</li>
                  <li>📅 <strong>Bi-weekly:</strong> 1 Mock Interview</li>
                </ul>
              </div>
            </div>
            <div className="insight-card">
              <div className="insight-icon">💡</div>
              <div className="insight-content">
                <h4>Preparation Tips</h4>
                <ul>
                  <li>✅ Practice more on <strong>System Design</strong> questions</li>
                  <li>✅ Review <strong>Dynamic Programming</strong> patterns</li>
                  <li>✅ Work on <strong>optimization</strong> techniques</li>
                  <li>✅ Improve <strong>communication</strong> during problem-solving</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;