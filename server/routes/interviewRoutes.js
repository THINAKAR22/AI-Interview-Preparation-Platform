const express = require('express');
const router = express.Router();
const {
  startInterview,
  completeInterview,
  getMySessions,
  getSessionById,
  getPracticeQuestions,
} = require('../controllers/interviewController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.post('/start', startInterview);
router.get('/my', getMySessions);
router.get('/questions', getPracticeQuestions);
router.get('/:id', getSessionById);
router.put('/:id/complete', completeInterview);

module.exports = router;
