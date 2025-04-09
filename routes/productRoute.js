const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { verifyToken, isAdmin } = require('../middlewares/authorization');  // Import middleware xác thực và phân quyền
const multer = require('multer');

// Cấu hình multer để lưu file vào thư mục uploads/
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// Các route cho Admin (thêm, sửa, xóa sản phẩm)
router.get('/', productController.getAllProducts);  // Dành cho cả Admin và User
router.post('/', verifyToken, isAdmin, upload.single('image'), productController.createProduct);  // Admin chỉ có quyền tạo
router.put('/:id', verifyToken, isAdmin, upload.single('image'), productController.updateProduct);  // Admin chỉ có quyền sửa
router.delete('/:id', verifyToken, isAdmin, productController.deleteProduct);  // Admin chỉ có quyền xóa

module.exports = router;
