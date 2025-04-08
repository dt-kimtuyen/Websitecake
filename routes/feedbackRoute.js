const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');
const jwt = require('jsonwebtoken');

// Middleware token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(403).json({ message: 'Không có token' });

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.status(401).json({ message: 'Token không hợp lệ' });
    req.user = user;
    next();
  });
};

router.get('/', feedbackController.getAllFeedback);
router.post('/', verifyToken, feedbackController.createFeedback);
router.put('/:id', verifyToken, feedbackController.updateFeedback);
router.delete('/:id', verifyToken, feedbackController.deleteFeedback);

module.exports = router;
