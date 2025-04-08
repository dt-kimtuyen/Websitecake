const Product = require('../models/Product');


// Thêm sản phẩm
exports.createProduct = async (req, res) => {
    try {
      console.log('req.body:', req.body);
      console.log('req.file:', req.file);
  
      const { name, price } = req.body;
      const image = req.file ? req.file.filename : null;
  
      const product = new Product({ name, price, image });
      await product.save();
  
      res.status(201).json({ message: 'Thêm sản phẩm thành công', product });
    } catch (err) {
      console.error('❌ Lỗi khi thêm sản phẩm:', err);
      res.status(500).json({ message: 'Lỗi server' });
    }
  };
  

  exports.getAllProducts = async (req, res) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (err) {
      console.error('❌ Lỗi khi lấy sản phẩm:', err);
      res.status(500).json({ message: 'Lỗi server' });
    }
  };
  

// Sửa sản phẩm
exports.updateProduct = async (req, res) => {
    try {
      const { name, price } = req.body;
      const image = req.file ? req.file.filename : undefined;
  
      const updated = await Product.findByIdAndUpdate(
        req.params.id,
        { name, price, ...(image && { image }) },
        { new: true }
      );
  
      if (!updated) return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
  
      res.json({ message: 'Cập nhật thành công', product: updated });
    } catch (err) {
      console.error('❌ Lỗi update:', err);
      res.status(500).json({ message: 'Lỗi server' });
    }
  };
  

// Xoá sản phẩm
exports.deleteProduct = async (req, res) => {
    try {
      const deleted = await Product.findByIdAndDelete(req.params.id);
  
      if (!deleted) return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
  
      res.json({ message: 'Xoá thành công' });
    } catch (err) {
      console.error('❌ Lỗi xoá:', err);
      res.status(500).json({ message: 'Lỗi server' });
    }
  };
  

