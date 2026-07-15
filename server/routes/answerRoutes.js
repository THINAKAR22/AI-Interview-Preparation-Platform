const express = require('express');
const router = express.Router();
const { submitAnswer, getMyAnswers, getAnswerById, getStats } = require('../controllers/answerController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.post('/', submitAnswer);
router.get('/my', getMyAnswers);
router.get('/stats', getStats);
router.get('/:id', getAnswerById);

module.exports = router;
