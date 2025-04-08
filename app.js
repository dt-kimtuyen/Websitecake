const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Để load CSS, ảnh tĩnh
app.use('/uploads', express.static('uploads')); // Load ảnh từ thư mục uploads

// View Engine - PUG
app.set('view engine', 'pug');
app.set('views', './views');

mongoose.connect('mongodb://localhost:27017/websiteflow')
  .then(() => console.log("Kết nối MongoDB thành công!"))
  .catch((err) => console.log("Lỗi kết nối MongoDB:", err));


// UI Routes (Giao diện)
app.get('/', (req, res) => res.render('index'));
app.get('/login-ui', (req, res) => res.render('login'));
app.get('/register-ui', (req, res) => res.render('register'));
app.get('/product-ui', (req, res) => res.render('product'));
app.get('/category-ui', (req, res) => res.render('category'));
app.get('/order-ui', (req, res) => res.render('order'));
app.get('/feedback-ui', (req, res) => res.render('feedback'));
app.get('/blog-ui', (req, res) => res.render('blog'));
app.get('/warehouse-ui', (req, res) => res.render('warehouse'));

// API Routes
app.use('/api/users', require('./routes/userRoute'));
app.use('/api/products', require('./routes/productRoute'));
app.use('/api/categories', require('./routes/categoryRoute'));
app.use('/api/orders', require('./routes/orderRoute'));
app.use('/api/feedbacks', require('./routes/feedbackRoute'));
app.use('/api/warehouses', require('./routes/warehouseRoute'));
app.use('/api/blogs', require('./routes/blogRoute'));

// Khởi động server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});
