const express = require('express');
const router = express.Router();
const { sendMessage, getMessages, getUserChats } = require('../controllers/messageController');
const authenticate = require('../middlewares/authenticateToken'); // Middleware xác thực người dùng

// Route gửi tin nhắn
router.post('/send', authenticate, sendMessage); // Middleware authenticate để kiểm tra người dùng

// Route lấy tin nhắn giữa hai người dùng
router.get('/messages/:userId', authenticate, getMessages);

// Route lấy danh sách các cuộc trò chuyện của người dùng
router.get('/chats', authenticate, getUserChats);

module.exports = router;
