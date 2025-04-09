// categoryRoute.js
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { verifyToken, isAdmin } = require('../middlewares/authorization');  // Import verifyToken từ file authorization.js

// Các route sử dụng verifyToken đã được import
router.get('/', categoryController.getAllCategories);
router.post('/', verifyToken,isAdmin, categoryController.createCategory);  // Sử dụng middleware verifyToken
router.put('/:id', verifyToken,isAdmin, categoryController.updateCategory); // Sử dụng middleware verifyToken
router.delete('/:id', verifyToken,isAdmin, categoryController.deleteCategory); // Sử dụng middleware verifyToken

module.exports = router;  // Xuất router để sử dụng trong file app.js hoặc các route khác
