const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');
const { verifyToken, isAdmin } = require('../middlewares/authorization');  // Import middleware

// Các route cho Role với phân quyền Admin
router.post('/create', verifyToken, isAdmin, roleController.createRole);  // Chỉ admin mới có thể tạo role
router.get('/', verifyToken, roleController.getAllRoles);        // Có thể public hoặc yêu cầu token tùy vào yêu cầu của bạn
router.get('/:id', verifyToken, roleController.getRoleById);    // Có thể public hoặc yêu cầu token tùy vào yêu cầu của bạn
router.put('/:id', verifyToken, isAdmin, roleController.updateRole);     // Chỉ admin mới có thể cập nhật role
router.delete('/:id', verifyToken, isAdmin, roleController.deleteRole);  // Chỉ admin mới có thể xóa role


  
module.exports = router;
