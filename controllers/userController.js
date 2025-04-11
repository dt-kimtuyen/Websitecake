const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Role = require('../models/Role');  // Import mô hình Role


exports.register = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Tên người dùng và mật khẩu không thể để trống' });
    }

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) return res.status(400).json({ message: 'Tài khoản đã tồn tại' });

        const defaultRole = await Role.findOne({ name: 'user' }); // Lấy role mặc định 'user'
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword, role: defaultRole._id });

        await newUser.save();
        res.status(201).json({ message: 'Đăng ký thành công' });
    } catch (err) {
        console.error("Lỗi đăng ký:", err);
        res.status(500).json({ message: 'Lỗi server khi đăng ký người dùng' });
    }
};


// Đăng nhập
exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ message: 'Tài khoản không tồn tại' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Sai mật khẩu' });

        // In ra để kiểm tra
        console.log(" Đăng nhập thành công:", user.username);

        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
        res.json({ message: 'Đăng nhập thành công', token });
    } catch (err) {
        console.error(" Lỗi đăng nhập:", err);
        res.status(500).json({ message: 'Lỗi server' });
    }
};

