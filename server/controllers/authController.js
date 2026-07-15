const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const { isValidEmail, validatePassword, requireFields } = require('../utils/validators');
const { sendWelcomeEmail } = require('../services/mailService');

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res) => {
  const { name, email, password } = req.body;

  const { valid: hasFields, missing } = requireFields(req.body, ['name', 'email', 'password']);
  if (!hasFields) {
    return res.status(400).json({ success: false, message: `Missing required fields: ${missing.join(', ')}` });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ success: false, message: 'Invalid email address' });
  }

  const { valid: pwValid, message: pwMsg } = validatePassword(password);
  if (!pwValid) {
    return res.status(400).json({ success: false, message: pwMsg });
  }

  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    return res.status(409).json({ success: false, message: 'Email already registered' });
  }

  const user = await User.create({ name: name.trim(), email: email.toLowerCase(), password });

  // Send welcome email (non-blocking)
  sendWelcomeEmail(user.email, user.name).catch(console.error);

  const token = generateToken(user._id);

  res.status(201).json({
    success: true,
    message: 'Registration successful',
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
    },
  });
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  const { email, password } = req.body;

  const { valid: hasFields } = requireFields(req.body, ['email', 'password']);
  if (!hasFields) {
    return res.status(400).json({ success: false, message: 'Email and password are required' });
  }

  const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
  if (!user) {
    return res.status(401).json({ success: false, message: 'Invalid email or password' });
  }

  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return res.status(401).json({ success: false, message: 'Invalid email or password' });
  }

  const token = generateToken(user._id);

  res.json({
    success: true,
    message: 'Login successful',
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      streak: user.streak,
      totalSessions: user.totalSessions,
      averageScore: user.averageScore,
    },
  });
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
const getProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }
  res.json({ success: true, user });
};

// @desc    Update user profile
// @route   PUT /api/auth/me
// @access  Private
const updateProfile = async (req, res) => {
  const { name, targetRole, experienceLevel, skills, avatar } = req.body;

  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  if (name) user.name = name.trim();
  if (targetRole) user.targetRole = targetRole;
  if (experienceLevel) user.experienceLevel = experienceLevel;
  if (skills) user.skills = skills;
  if (avatar) user.avatar = avatar;

  const updatedUser = await user.save();

  res.json({ success: true, message: 'Profile updated successfully', user: updatedUser });
};

// @desc    Change password
// @route   PUT /api/auth/change-password
// @access  Private
const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const { valid: hasFields } = requireFields(req.body, ['currentPassword', 'newPassword']);
  if (!hasFields) {
    return res.status(400).json({ success: false, message: 'Current and new passwords are required' });
  }

  const { valid: pwValid, message: pwMsg } = validatePassword(newPassword);
  if (!pwValid) {
    return res.status(400).json({ success: false, message: pwMsg });
  }

  const user = await User.findById(req.user._id).select('+password');
  const isMatch = await user.matchPassword(currentPassword);
  if (!isMatch) {
    return res.status(401).json({ success: false, message: 'Current password is incorrect' });
  }

  user.password = newPassword;
  await user.save();

  res.json({ success: true, message: 'Password changed successfully' });
};

// @desc    Google login / registration
// @route   POST /api/auth/google
// @access  Public
const googleLogin = async (req, res) => {
  const { credential } = req.body;

  if (!credential) {
    return res.status(400).json({ success: false, message: 'Google credential (ID token) is required' });
  }

  try {
    // Verify credential via Google's tokeninfo API
    const response = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${credential}`);
    const data = await response.json();

    if (data.error_description) {
      return res.status(400).json({ success: false, message: data.error_description });
    }

    const { email, name, picture } = data;

    if (!email) {
      return res.status(400).json({ success: false, message: 'Email not returned by Google' });
    }

    let user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      // Create user if they don't exist
      // Since it's Google login, we generate a random password
      const randomPassword = Math.random().toString(36).substring(2, 10) + '1a!';
      user = await User.create({
        name: name || email.split('@')[0],
        email: email.toLowerCase(),
        password: randomPassword,
        avatar: picture || '',
        isEmailVerified: true,
      });

      // Send welcome email (non-blocking)
      sendWelcomeEmail(user.email, user.name).catch(console.error);
    }

    const token = generateToken(user._id);

    res.json({
      success: true,
      message: 'Google login successful',
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        streak: user.streak,
        totalSessions: user.totalSessions,
        averageScore: user.averageScore,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Google authentication failed',
      error: error.message,
    });
  }
};

module.exports = { register, login, getProfile, updateProfile, changePassword, googleLogin };
