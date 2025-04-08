const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const multer = require('multer');
const jwt = require('jsonwebtoken');

// Cấu hình multer để lưu file vào thư mục uploads/
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// Middleware xác thực JWT
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
  

// ROUTES
router.get('/', productController.getAllProducts);
router.post('/', verifyToken, upload.single('image'), productController.createProduct);
router.put('/:id', verifyToken, upload.single('image'), productController.updateProduct);
router.delete('/:id', verifyToken, productController.deleteProduct);

module.exports = router;
