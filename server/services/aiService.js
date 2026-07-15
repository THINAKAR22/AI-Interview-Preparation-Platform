/**
 * AI Service – Mock implementation.
 * Replace the prompt functions with actual API calls to Gemini / OpenAI.
 */

/**
 * Evaluate an interview answer and return a score with AI feedback.
 * @param {string} question - The interview question text
 * @param {string} answer - The candidate's answer text
 * @param {string} category - e.g., 'DSA', 'System Design', 'HR'
 * @returns {Promise<object>} scores and feedback
 */
const evaluateAnswer = async (question, answer, category = 'Technical') => {
  // --- Placeholder logic (replace with real AI call) ---
  const wordCount = answer.trim().split(/\s+/).length;
  const baseScore = Math.min(100, 50 + Math.floor(wordCount / 2));

  return {
    scores: {
      overall: baseScore,
      technical: baseScore + 3 > 100 ? 100 : baseScore + 3,
      communication: baseScore - 5 < 0 ? 0 : baseScore - 5,
      confidence: baseScore - 2 < 0 ? 0 : baseScore - 2,
      relevance: baseScore + 1 > 100 ? 100 : baseScore + 1,
    },
    aiFeedback: {
      strengths: ['Clear structure', 'Relevant examples mentioned'],
      improvements: ['Add more specifics', 'Mention trade-offs'],
      summary: `Your answer for the ${category} question covered key concepts. Focus on depth and examples to improve your score.`,
    },
  };
};

/**
 * Generate interview questions for a given role and difficulty.
 * @param {string} role - Target job role
 * @param {string} category - e.g., 'Technical', 'HR'
 * @param {string} difficulty - 'Easy' | 'Medium' | 'Hard'
 * @param {number} count - number of questions to generate
 * @returns {Promise<string[]>}
 */
const generateQuestions = async (role, category, difficulty = 'Medium', count = 5) => {
  // --- Placeholder data (replace with real AI call) ---
  const questionBank = {
    Technical: [
      `Explain the differences between REST and GraphQL APIs for a ${role} role.`,
      `How would you design a scalable microservices architecture for a high-traffic application?`,
      `What are the SOLID principles and how do you apply them in your projects?`,
      `Describe your experience with CI/CD pipelines and deployment strategies.`,
      `How do you handle database migrations in a production environment?`,
    ],
    HR: [
      'Tell me about a time you resolved a conflict within your team.',
      'What motivates you to keep improving as a developer?',
      'How do you handle tight deadlines and pressure?',
      'Where do you see yourself in 5 years?',
      'Why do you want to work at our company?',
    ],
    Behavioral: [
      'Describe a challenging project and how you overcame obstacles.',
      'Tell me about a time you had to learn a new technology quickly.',
      'How do you prioritize tasks when working on multiple projects?',
      'Describe a situation where you had to give difficult feedback.',
      'How do you stay updated with the latest industry trends?',
    ],
  };

  const pool = questionBank[category] || questionBank['Technical'];
  return pool.slice(0, Math.min(count, pool.length));
};

/**
 * Analyze resume text and return structured feedback.
 * @param {string} resumeText - Extracted text from resume
 * @param {string} targetRole - Desired job role
 * @returns {Promise<object>}
 */
const analyzeResume = async (resumeText, targetRole = 'Software Engineer') => {
  // --- Placeholder logic (replace with real AI call) ---
  const wordCount = resumeText.trim().split(/\s+/).length;
  const atsScore = Math.min(100, 40 + Math.floor(wordCount / 10));

  return {
    overallScore: atsScore,
    atsScore,
    strengths: ['Good experience section', 'Quantified achievements'],
    weaknesses: ['Skills section could be more detailed', 'Missing a professional summary'],
    suggestions: [
      `Tailor keywords for ${targetRole} roles`,
      'Add a concise professional summary at the top',
      'Quantify more achievements with metrics',
    ],
    keywords: ['JavaScript', 'Node.js', 'React', 'MongoDB', 'REST API'],
    missingKeywords: ['Docker', 'Kubernetes', 'AWS', 'TypeScript'],
    summary: `Your resume shows solid foundations for a ${targetRole} position. Strengthen the skills section and add more ATS-friendly keywords.`,
  };
};

module.exports = { evaluateAnswer, generateQuestions, analyzeResume };
