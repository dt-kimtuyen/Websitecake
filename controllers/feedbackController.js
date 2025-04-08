const Feedback = require('../models/Feedback');

// CREATE
exports.createFeedback = async (req, res) => {
  try {
    const { name, message, rating } = req.body;
    const fb = new Feedback({ name, message, rating });
    await fb.save();
    res.status(201).json({ message: 'Gửi phản hồi thành công', fb });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server' });
  }
};

// READ
exports.getAllFeedback = async (req, res) => {
  const feedbacks = await Feedback.find();
  res.json(feedbacks);
};

// UPDATE
exports.updateFeedback = async (req, res) => {
  try {
    const { name, message, rating } = req.body;
    const updated = await Feedback.findByIdAndUpdate(
      req.params.id,
      { name, message, rating },
      { new: true }
    );
    res.json({ message: 'Cập nhật phản hồi thành công', updated });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server' });
  }
};

// DELETE
exports.deleteFeedback = async (req, res) => {
  try {
    await Feedback.findByIdAndDelete(req.params.id);
    res.json({ message: 'Xoá phản hồi thành công' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server' });
  }
};
