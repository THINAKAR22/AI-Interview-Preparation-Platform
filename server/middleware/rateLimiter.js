// Simple in-memory rate limiter (replace with express-rate-limit for production)
const requestCounts = new Map();

const rateLimiter = (maxRequests = 100, windowMs = 15 * 60 * 1000) => {
  return (req, res, next) => {
    const ip = req.ip || req.connection.remoteAddress;
    const now = Date.now();
    const windowStart = now - windowMs;

    if (!requestCounts.has(ip)) {
      requestCounts.set(ip, []);
    }

    // Filter out old requests outside the window
    const requests = requestCounts.get(ip).filter((timestamp) => timestamp > windowStart);
    requests.push(now);
    requestCounts.set(ip, requests);

    if (requests.length > maxRequests) {
      return res.status(429).json({
        success: false,
        message: 'Too many requests. Please try again later.',
        retryAfter: Math.ceil(windowMs / 1000),
      });
    }

    next();
  };
};

// Stricter limiter for auth endpoints
const authRateLimiter = rateLimiter(10, 15 * 60 * 1000); // 10 per 15 min
const generalRateLimiter = rateLimiter(100, 15 * 60 * 1000); // 100 per 15 min

module.exports = { rateLimiter, authRateLimiter, generalRateLimiter };
