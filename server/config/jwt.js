if (process.env.NODE_ENV === 'production' && !process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET must be set in production');
}

module.exports = {
  JWT_SECRET: process.env.JWT_SECRET || 'development-only-secret',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
};
