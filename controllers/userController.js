const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Đăng ký
exports.register = async (req, res) => {
    const { username, password } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) return res.status(400).json({ message: 'Tài khoản đã tồn tại' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'Đăng ký thành công' });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi server' });
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

