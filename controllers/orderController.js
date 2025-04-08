const Order = require('../models/Order');

// CREATE
exports.createOrder = async (req, res) => {
  try {
    const { customerName, products, total, status } = req.body;
    const order = new Order({ customerName, products, total, status });
    await order.save();
    res.status(201).json({ message: 'Đặt hàng thành công', order });
  } catch (err) {
    console.error('❌ Lỗi tạo đơn hàng:', err);
    res.status(500).json({ message: 'Lỗi server' });
  }
};

// READ
exports.getAllOrders = async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
};

// UPDATE
exports.updateOrder = async (req, res) => {
  try {
    const { customerName, products, total, status } = req.body;
    const updated = await Order.findByIdAndUpdate(
      req.params.id,
      { customerName, products, total, status },
      { new: true }
    );
    res.json({ message: 'Cập nhật thành công', updated });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server' });
  }
};

// DELETE
exports.deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: 'Xoá đơn hàng thành công' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server' });
  }
};
