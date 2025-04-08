const Category = require('../models/Category');

// CREATE
exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const cat = new Category({ name, description });
    await cat.save();
    res.status(201).json({ message: 'Tạo danh mục thành công', cat });
  } catch (err) {
    console.error(' Lỗi tạo danh mục:', err);
    res.status(500).json({ message: 'Lỗi server' });
  }
};

// READ
exports.getAllCategories = async (req, res) => {
  const list = await Category.find();
  res.json(list);
};

// UPDATE
exports.updateCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const updated = await Category.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true }
    );
    res.json({ message: 'Cập nhật thành công', updated });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server' });
  }
};

// DELETE
exports.deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: 'Xoá thành công' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server' });
  }
};
