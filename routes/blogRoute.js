const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const jwt = require('jsonwebtoken');
const multer = require('multer');

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

// Upload ảnh
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

router.get('/', blogController.getAllBlogs);
router.post('/', verifyToken, upload.single('image'), blogController.createBlog);
router.put('/:id', verifyToken, upload.single('image'), blogController.updateBlog);
router.delete('/:id', verifyToken, blogController.deleteBlog);

module.exports = router;
