'use strict';

var _this = this;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var Message = require('../models/message');
var User = require('../models/user'); // Mô hình người dùng
var Friendship = require('../models/Friendship');
var moment = require('moment');
var Notification = require('../models/Notification');
// Gửi tin nhắn
exports.sendMessage = function callee$0$0(req, res) {
    var _req$body, receiverId, content, senderId, receiver, isFriend, newMessage, user, newNotification;

    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                context$1$0.prev = 0;
                _req$body = req.body;
                receiverId = _req$body.receiverId;
                content = _req$body.content;
                senderId = req.userId;
                context$1$0.next = 7;
                return regeneratorRuntime.awrap(User.findById(receiverId));

            case 7:
                receiver = context$1$0.sent;

                if (receiver) {
                    context$1$0.next = 10;
                    break;
                }

                return context$1$0.abrupt('return', res.status(404).json({ message: 'Receiver not found' }));

            case 10:
                context$1$0.next = 12;
                return regeneratorRuntime.awrap(Friendship.findOne({
                    $or: [{ requester: senderId, recipient: receiverId }, { requester: receiverId, recipient: senderId }]
                }));

            case 12:
                isFriend = context$1$0.sent;

                if (isFriend) {
                    context$1$0.next = 15;
                    break;
                }

                return context$1$0.abrupt('return', res.status(400).json({ message: 'Receiver is not a friend' }));

            case 15:
                newMessage = new Message({
                    senderId: senderId,
                    receiverId: receiverId,
                    content: content,
                    createdAt: new Date()
                });
                context$1$0.next = 18;
                return regeneratorRuntime.awrap(newMessage.save());

            case 18:
                context$1$0.next = 20;
                return regeneratorRuntime.awrap(User.findById(senderId).select('username'));

            case 20:
                user = context$1$0.sent;
                newNotification = new Notification({
                    userId: receiverId, // Người nhận thông báo
                    type: 'new_message', // Loại thông báo
                    message: receiver.username + ', bạn vừa nhận được một tin nhắn mới từ ' + user.username, // Nội dung thông báo
                    createdAt: new Date(),
                    isRead: false // Đánh dấu thông báo chưa được đọc
                });
                context$1$0.next = 24;
                return regeneratorRuntime.awrap(newNotification.save());

            case 24:

                // Trả về tin nhắn vừa tạo
                res.status(201).json(newMessage);
                context$1$0.next = 31;
                break;

            case 27:
                context$1$0.prev = 27;
                context$1$0.t0 = context$1$0['catch'](0);

                console.error(context$1$0.t0);
                res.status(500).json({ message: 'Server error', error: context$1$0.t0 });

            case 31:
            case 'end':
                return context$1$0.stop();
        }
    }, null, _this, [[0, 27]]);
};

// lay dnah sach tin nhắn giũa hai người
exports.getMessages = function callee$0$0(req, res) {
    var userId, currentUserId, messages, formattedMessages;
    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                context$1$0.prev = 0;
                userId = req.params.userId;
                currentUserId = req.userId;
                context$1$0.next = 5;
                return regeneratorRuntime.awrap(Message.find({
                    $or: [{ senderId: currentUserId, receiverId: userId }, { senderId: userId, receiverId: currentUserId }]
                }).sort({ createdAt: 1 }));

            case 5:
                messages = context$1$0.sent;
                formattedMessages = messages.map(function (message) {
                    return _extends({}, message.toObject(), {
                        createdAt: moment(message.createdAt).fromNow() // Định dạng ngày giờ
                    });
                });

                res.status(200).json(formattedMessages);

                context$1$0.next = 14;
                break;

            case 10:
                context$1$0.prev = 10;
                context$1$0.t0 = context$1$0['catch'](0);

                console.error(context$1$0.t0);
                res.status(500).json({ message: 'Server error', error: context$1$0.t0 });

            case 14:
            case 'end':
                return context$1$0.stop();
        }
    }, null, _this, [[0, 10]]);
};

// Lấy danh sách những người đã nhắn tin với người dùng hiện tại
exports.getChatUsers = function callee$0$0(req, res) {
    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
        var _this2 = this;

        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                context$1$0.prev = 0;
                context$1$0.next = 3;
                return regeneratorRuntime.awrap((function callee$1$0() {
                    var currentUserId, messages, userIds, uniqueUserIds, users;
                    return regeneratorRuntime.async(function callee$1$0$(context$2$0) {
                        while (1) switch (context$2$0.prev = context$2$0.next) {
                            case 0:
                                currentUserId = req.userId;
                                context$2$0.next = 3;
                                return regeneratorRuntime.awrap(Message.find({
                                    $or: [{ senderId: currentUserId }, { receiverId: currentUserId }]
                                }));

                            case 3:
                                messages = context$2$0.sent;
                                userIds = messages.flatMap(function (msg) {
                                    return msg.senderId.toString() === currentUserId ? msg.receiverId.toString() : msg.senderId.toString();
                                });
                                uniqueUserIds = [].concat(_toConsumableArray(new Set(userIds)));
                                context$2$0.next = 8;
                                return regeneratorRuntime.awrap(User.find({ _id: { $in: uniqueUserIds } }).select('username avatar email'));

                            case 8:
                                users = context$2$0.sent;

                                res.status(200).json(users);

                            case 10:
                            case 'end':
                                return context$2$0.stop();
                        }
                    }, null, _this2);
                })());

            case 3:
                context$1$0.next = 9;
                break;

            case 5:
                context$1$0.prev = 5;
                context$1$0.t0 = context$1$0['catch'](0);

                console.error('Error getting chat users:', context$1$0.t0);
                res.status(500).json({ message: 'Server error', error: context$1$0.t0 });

            case 9:
            case 'end':
                return context$1$0.stop();
        }
    }, null, _this, [[0, 5]]);
};
// Lấy receiverId và nội dung tin nhắn từ body yêu cầu
// Lấy userId từ middleware xác thực

// Kiểm tra xem người nhận có tồn tại trong hệ thống không

// Kiểm tra xem hai người có là bạn bè không

// Tạo tin nhắn mới

// Lưu tin nhắn vào cơ sở dữ liệu

// Tạo thông báo cho người tạo bài viết
// Lấy trường 'name' của người dùng

// **Tạo thông báo**

// Lưu thông báo vào cơ sở dữ liệu
// Lấy ID người dùng từ URL
// Lấy userId của người dùng hiện tại từ middleware xác thực

// Tìm tất cả tin nhắn giữa người dùng hiện tại và người dùng khác
// Sắp xếp theo thời gian gửi (cũ nhất trước)
// Định dạng lại createdAt của mỗi tin nhắn
// Lấy userId của người dùng hiện tại từ middleware xác thực

// Tìm tất cả các tin nhắn mà người dùng hiện tại là người gửi hoặc người nhận

// Trích xuất danh sách userId từ tin nhắn

// Loại bỏ trùng lặp trong danh sách userId

// Lấy thông tin chi tiết của những người dùng này