const Message = require('../models/message');
const User = require('../models/user'); // Mô hình người dùng
const Friendship = require('../models/Friendship');
// Gửi tin nhắn
exports.sendMessage = async (req, res) => {
    try {
        const { receiverId, content } = req.body;  // Lấy receiverId và nội dung tin nhắn từ body yêu cầu
        const senderId = req.userId;  // Lấy userId từ middleware xác thực

        // Kiểm tra xem người nhận có tồn tại trong hệ thống không
        const receiver = await User.findById(receiverId);
        if (!receiver) {
            return res.status(404).json({ message: 'Receiver not found' });
        }

        // Kiểm tra xem hai người có là bạn bè không
        const isFriend = await Friendship.findOne({
            $or: [
                { requester: senderId, recipient: receiverId },
                { requester: receiverId, recipient: senderId }
            ]
        });

        if (!isFriend) {
            return res.status(400).json({ message: 'Receiver is not a friend' });
        }
        // Tạo tin nhắn mới
        const newMessage = new Message({
            senderId,
            receiverId,
            content,
            createdAt: new Date(),
        });

        // Lưu tin nhắn vào cơ sở dữ liệu
        await newMessage.save();

        // Trả về tin nhắn vừa tạo
        res.status(201).json(newMessage);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
};

// lay dnah sach tin nhắn giũa hai người
exports.getMessages = async (req, res) => {
    try {
        const { userId } = req.params; // Lấy ID người dùng từ URL
        const currentUserId = req.userId; // Lấy userId của người dùng hiện tại từ middleware xác thực
        
        // Tìm tất cả tin nhắn giữa người dùng hiện tại và người dùng khác
        const messages = await Message.find({
            $or: [
                { senderId: currentUserId, receiverId: userId },
                { senderId: userId, receiverId: currentUserId }
            ]
        })
            .sort({ createdAt: 1 }); // Sắp xếp theo thời gian gửi (cũ nhất trước)

        res.status(200).json(messages); // Trả về danh sách tin nhắn
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
};
// / trả về danh sách các cuộc trò chuyện của người dùng hiện tại.
exports.getUserChats = async (req, res) => {
    try {
        const userId = req.userId; // Lấy userId từ middleware xác thực

        // Lấy danh sách các người dùng đã trò chuyện với người dùng hiện tại
        const chats = await Message.aggregate([
            { $match: { $or: [{ senderId: userId }, { receiverId: userId }] } },
            { $group: { _id: { $cond: [{ $eq: ['$senderId', userId] }, '$receiverId', '$senderId'] } } }
        ]);

        // Trả về danh sách cuộc trò chuyện (người dùng đã trò chuyện)
        res.status(200).json(chats);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
};
