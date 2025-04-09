// authorization.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware xác thực token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];  // Lấy token từ header
  
  if (!token) return res.status(403).json({ message: 'Không có token' });

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.status(401).json({ message: 'Token không hợp lệ' });
    
    // Lưu thông tin người dùng vào req.user
    req.user = user;
    next();  // Tiếp tục tới các middleware hoặc route tiếp theo
  });
};

// Middleware kiểm tra quyền Admin
const isAdmin = async (req, res, next) => {
  try {
    // Lấy thông tin người dùng và populate role
    const user = await User.findById(req.user.id).populate('role');  // Giả sử role là ObjectId trong User

    if (!user || user.role.name !== 'admin') {
      return res.status(403).json({ message: 'Bạn không có quyền admin' });
    }

    next();  // Nếu là Admin, tiếp tục xử lý yêu cầu
  } catch (err) {
    console.error("Lỗi khi kiểm tra quyền Admin:", err);
    res.status(500).json({ message: 'Lỗi server khi kiểm tra quyền Admin' });
  }
};



module.exports = { verifyToken, isAdmin };  // Xuất middleware để sử dụng ở các file khác
