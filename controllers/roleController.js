const Role = require('../models/Role');

// Tạo mới Role
exports.createRole = async (req, res) => {
  const { name, description, permissions } = req.body;

  try {
    // Kiểm tra xem role đã tồn tại chưa
    const existingRole = await Role.findOne({ name });
    if (existingRole) return res.status(400).json({ message: 'Role đã tồn tại' });

    // Tạo role mới
    const newRole = new Role({
      name,
      description,
      permissions
    });

    await newRole.save();
    res.status(201).json({ message: 'Role tạo thành công', newRole });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi server khi tạo role' });
  }
};

// Lấy tất cả roles
exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.status(200).json(roles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi server khi lấy danh sách roles' });
  }
};

// Lấy role theo ID
exports.getRoleById = async (req, res) => {
  const { id } = req.params;

  try {
    const role = await Role.findById(id);
    if (!role) {
      return res.status(404).json({ message: 'Role không tìm thấy' });
    }
    res.status(200).json(role);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi server khi lấy role theo ID' });
  }
};

// Cập nhật role theo ID
exports.updateRole = async (req, res) => {
  const { id } = req.params;
  const { name, description, permissions } = req.body;

  try {
    const updatedRole = await Role.findByIdAndUpdate(
      id,
      { name, description, permissions },
      { new: true }
    );

    if (!updatedRole) {
      return res.status(404).json({ message: 'Role không tìm thấy' });
    }

    res.status(200).json({ message: 'Role cập nhật thành công', updatedRole });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi server khi cập nhật role' });
  }
};

// Xóa role theo ID
exports.deleteRole = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedRole = await Role.findByIdAndDelete(id);
    if (!deletedRole) {
      return res.status(404).json({ message: 'Role không tìm thấy' });
    }

    res.status(200).json({ message: 'Role xóa thành công' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi server khi xóa role' });
  }
};
