const express = require('express');
const router = express.Router();
const warehouseController = require('../controllers/warehouseController');
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

router.get('/', warehouseController.getAllWarehouses);
router.post('/', verifyToken, warehouseController.createWarehouse);
router.put('/:id', verifyToken, warehouseController.updateWarehouse);
router.delete('/:id', verifyToken, warehouseController.deleteWarehouse);

module.exports = router;
