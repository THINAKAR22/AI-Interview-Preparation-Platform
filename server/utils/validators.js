/**
 * Validates email format.
 * @param {string} email
 * @returns {boolean}
 */
const isValidEmail = (email) => {
  const re = /^\S+@\S+\.\S+$/;
  return re.test(String(email).toLowerCase());
};

/**
 * Validates password strength (min 6 chars, at least one number).
 * @param {string} password
 * @returns {{ valid: boolean, message: string }}
 */
const validatePassword = (password) => {
  if (!password || password.length < 6) {
    return { valid: false, message: 'Password must be at least 6 characters' };
  }
  if (!/\d/.test(password)) {
    return { valid: false, message: 'Password must contain at least one number' };
  }
  return { valid: true, message: '' };
};

/**
 * Sanitize a string by trimming whitespace.
 * @param {string} str
 * @returns {string}
 */
const sanitizeString = (str) => (typeof str === 'string' ? str.trim() : '');

/**
 * Validates that required fields are present in a request body.
 * @param {object} body - req.body
 * @param {string[]} fields - required field names
 * @returns {{ valid: boolean, missing: string[] }}
 */
const requireFields = (body, fields) => {
  const missing = fields.filter((f) => !body[f] || String(body[f]).trim() === '');
  return { valid: missing.length === 0, missing };
};

module.exports = { isValidEmail, validatePassword, sanitizeString, requireFields };
