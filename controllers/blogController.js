const Blog = require('../models/Blog');

// CREATE
exports.createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const image = req.file ? req.file.filename : undefined;

    const blog = new Blog({ title, content, image });
    await blog.save();

    res.status(201).json({ message: 'Tạo blog thành công', blog });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server' });
  }
};

// READ
exports.getAllBlogs = async (req, res) => {
  const blogs = await Blog.find();
  res.json(blogs);
};

// UPDATE
exports.updateBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const image = req.file ? req.file.filename : undefined;

    const updated = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, content, ...(image && { image }) },
      { new: true }
    );
    res.json({ message: 'Cập nhật blog thành công', updated });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server' });
  }
};

// DELETE
exports.deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: 'Xoá blog thành công' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server' });
  }
};
