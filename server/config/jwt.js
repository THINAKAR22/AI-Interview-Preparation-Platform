module.exports = {
  JWT_SECRET: process.env.JWT_SECRET || 'ai_interview_secret_key',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
};
