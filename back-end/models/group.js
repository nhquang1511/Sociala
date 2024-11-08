const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Người tạo nhóm
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Danh sách thành viên
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;
