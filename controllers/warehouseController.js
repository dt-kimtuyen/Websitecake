const Warehouse = require('../models/Warehouse');

// CREATE
exports.createWarehouse = async (req, res) => {
  try {
    const { productName, quantity, location } = req.body;
    const item = new Warehouse({ productName, quantity, location });
    await item.save();
    res.status(201).json({ message: 'Thêm kho thành công', item });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server' });
  }
};

// READ
exports.getAllWarehouses = async (req, res) => {
  const list = await Warehouse.find();
  res.json(list);
};

// UPDATE
exports.updateWarehouse = async (req, res) => {
  try {
    const { productName, quantity, location } = req.body;
    const updated = await Warehouse.findByIdAndUpdate(
      req.params.id,
      { productName, quantity, location, updatedAt: new Date() },
      { new: true }
    );
    res.json({ message: 'Cập nhật kho thành công', updated });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server' });
  }
};

// DELETE
exports.deleteWarehouse = async (req, res) => {
  try {
    await Warehouse.findByIdAndDelete(req.params.id);
    res.json({ message: 'Xoá kho thành công' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server' });
  }
};
