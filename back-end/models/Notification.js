// models/Notification.js
const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Người nhận thông báo
    type: { type: String, required: true }, // Loại thông báo (e.g., "like", "comment")
    message: { type: String, required: true }, // Nội dung thông báo
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', default: null }, // Liên kết đến bài viết (nếu có)
    isRead: { type: Boolean, default: false }, // Trạng thái đã đọc
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Notification', notificationSchema);
