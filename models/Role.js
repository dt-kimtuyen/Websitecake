const mongoose = require('mongoose');
const RoleSchema = new mongoose.Schema({
    name: { type: String, unique: true },
    description: String,
    permissions: {
      type: [String],  // Mảng chứa danh sách quyền
      default: []
    }
}, { timestamps: true });
module.exports = mongoose.model('Role', RoleSchema);