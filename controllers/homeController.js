// controllers/homeController.js
const Product = require('../models/Product');
const Category = require('../models/Category');

exports.homePage = async (req, res) => {
  try {
    const products = await Product.find({}); // Lấy tất cả sản phẩm
    const categories = await Category.find({}); // Lấy tất cả danh mục

    // Kiểm tra dữ liệu
    console.log(products); // In ra sản phẩm để kiểm tra
    console.log(categories); // In ra danh mục để kiểm tra

    // Truyền vào template Pug
    res.render('index.pug', { products, categories });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};
