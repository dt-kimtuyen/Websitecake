const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const jwt = require('jsonwebtoken');

// Middleware xác thực
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

router.get('/', orderController.getAllOrders);
router.post('/', verifyToken, orderController.createOrder);
router.put('/:id', verifyToken, orderController.updateOrder);
router.delete('/:id', verifyToken, orderController.deleteOrder);

module.exports = router;
