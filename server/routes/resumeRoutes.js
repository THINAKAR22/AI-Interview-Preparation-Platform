const express = require('express');
const router = express.Router();
const {
  uploadResume,
  getMyResumes,
  getResumeById,
  reanalyzeResume,
  deleteResume,
} = require('../controllers/resumeController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.post('/upload', uploadResume);
router.get('/my', getMyResumes);
router.get('/:id', getResumeById);
router.post('/:id/reanalyze', reanalyzeResume);
router.delete('/:id', deleteResume);

module.exports = router;
