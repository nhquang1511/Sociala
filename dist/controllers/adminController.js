'use strict';

var _this = this;

var User = require('../models/user');
var Post = require('../models/post');
var Group = require('../models/group');
var Message = require('../models/message');
var Notification = require('../models/Notification');
var Friendship = require('../models/Friendship');

// Lấy danh sách tất cả người dùng
exports.getAllUsers = function callee$0$0(req, res) {
    var users;
    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                context$1$0.prev = 0;
                context$1$0.next = 3;
                return regeneratorRuntime.awrap(User.find({}, '-password'));

            case 3:
                users = context$1$0.sent;
                // Không trả về trường password
                res.status(200).json(users);
                context$1$0.next = 10;
                break;

            case 7:
                context$1$0.prev = 7;
                context$1$0.t0 = context$1$0['catch'](0);

                res.status(500).json({ message: 'Error fetching users', error: context$1$0.t0 });

            case 10:
            case 'end':
                return context$1$0.stop();
        }
    }, null, _this, [[0, 7]]);
};

// Xóa người dùng theo ID
exports.deleteUser = function callee$0$0(req, res) {
    var userId, user;
    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                context$1$0.prev = 0;
                userId = req.params.userId;
                context$1$0.next = 4;
                return regeneratorRuntime.awrap(User.findById(userId));

            case 4:
                user = context$1$0.sent;

                if (user) {
                    context$1$0.next = 7;
                    break;
                }

                return context$1$0.abrupt('return', res.status(404).json({ message: 'User not found' }));

            case 7:
                context$1$0.next = 9;
                return regeneratorRuntime.awrap(User.findByIdAndDelete(userId));

            case 9:
                res.status(200).json({ message: 'User deleted successfully' });
                context$1$0.next = 15;
                break;

            case 12:
                context$1$0.prev = 12;
                context$1$0.t0 = context$1$0['catch'](0);

                res.status(500).json({ message: 'Error deleting user', error: context$1$0.t0 });

            case 15:
            case 'end':
                return context$1$0.stop();
        }
    }, null, _this, [[0, 12]]);
};

// Thay đổi vai trò người dùng (e.g., từ user thành admin)
exports.updateUserRole = function callee$0$0(req, res) {
    var userId, role, user;
    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                context$1$0.prev = 0;
                userId = req.params.userId;
                role = req.body.role;

                if (['admin', 'user'].includes(role)) {
                    context$1$0.next = 5;
                    break;
                }

                return context$1$0.abrupt('return', res.status(400).json({ message: 'Invalid role' }));

            case 5:
                context$1$0.next = 7;
                return regeneratorRuntime.awrap(User.findByIdAndUpdate(userId, { role: role }, { 'new': true }));

            case 7:
                user = context$1$0.sent;

                if (user) {
                    context$1$0.next = 10;
                    break;
                }

                return context$1$0.abrupt('return', res.status(404).json({ message: 'User not found' }));

            case 10:

                res.status(200).json({ message: 'User role updated', user: user });
                context$1$0.next = 16;
                break;

            case 13:
                context$1$0.prev = 13;
                context$1$0.t0 = context$1$0['catch'](0);

                res.status(500).json({ message: 'Error updating role', error: context$1$0.t0 });

            case 16:
            case 'end':
                return context$1$0.stop();
        }
    }, null, _this, [[0, 13]]);
};

// Lấy danh sách tất cả bài viết
exports.getAllPosts = function callee$0$0(req, res) {
    var posts;
    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                context$1$0.prev = 0;
                context$1$0.next = 3;
                return regeneratorRuntime.awrap(Post.find().populate('userId', 'username email'));

            case 3:
                posts = context$1$0.sent;

                res.status(200).json(posts);
                context$1$0.next = 10;
                break;

            case 7:
                context$1$0.prev = 7;
                context$1$0.t0 = context$1$0['catch'](0);

                res.status(500).json({ message: 'Error fetching posts', error: context$1$0.t0 });

            case 10:
            case 'end':
                return context$1$0.stop();
        }
    }, null, _this, [[0, 7]]);
};

// Xóa bài viết theo ID
exports.deletePost = function callee$0$0(req, res) {
    var postId, post;
    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                context$1$0.prev = 0;
                postId = req.params.postId;
                context$1$0.next = 4;
                return regeneratorRuntime.awrap(Post.findById(postId));

            case 4:
                post = context$1$0.sent;

                if (post) {
                    context$1$0.next = 7;
                    break;
                }

                return context$1$0.abrupt('return', res.status(404).json({ message: 'Post not found' }));

            case 7:
                context$1$0.next = 9;
                return regeneratorRuntime.awrap(Post.findByIdAndDelete(postId));

            case 9:
                res.status(200).json({ message: 'Post deleted successfully' });
                context$1$0.next = 15;
                break;

            case 12:
                context$1$0.prev = 12;
                context$1$0.t0 = context$1$0['catch'](0);

                res.status(500).json({ message: 'Error deleting post', error: context$1$0.t0 });

            case 15:
            case 'end':
                return context$1$0.stop();
        }
    }, null, _this, [[0, 12]]);
};

// Lấy danh sách tất cả nhóm
exports.getAllGroups = function callee$0$0(req, res) {
    var groups;
    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                context$1$0.prev = 0;
                context$1$0.next = 3;
                return regeneratorRuntime.awrap(Group.find().populate('creator', 'username email'));

            case 3:
                groups = context$1$0.sent;

                res.status(200).json(groups);
                context$1$0.next = 10;
                break;

            case 7:
                context$1$0.prev = 7;
                context$1$0.t0 = context$1$0['catch'](0);

                res.status(500).json({ message: 'Error fetching groups', error: context$1$0.t0 });

            case 10:
            case 'end':
                return context$1$0.stop();
        }
    }, null, _this, [[0, 7]]);
};

// Xóa nhóm theo ID
exports.deleteGroup = function callee$0$0(req, res) {
    var groupId, group;
    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                context$1$0.prev = 0;
                groupId = req.params.groupId;
                context$1$0.next = 4;
                return regeneratorRuntime.awrap(Group.findById(groupId));

            case 4:
                group = context$1$0.sent;

                if (group) {
                    context$1$0.next = 7;
                    break;
                }

                return context$1$0.abrupt('return', res.status(404).json({ message: 'Group not found' }));

            case 7:
                context$1$0.next = 9;
                return regeneratorRuntime.awrap(Group.findByIdAndDelete(groupId));

            case 9:
                res.status(200).json({ message: 'Group deleted successfully' });
                context$1$0.next = 15;
                break;

            case 12:
                context$1$0.prev = 12;
                context$1$0.t0 = context$1$0['catch'](0);

                res.status(500).json({ message: 'Error deleting group', error: context$1$0.t0 });

            case 15:
            case 'end':
                return context$1$0.stop();
        }
    }, null, _this, [[0, 12]]);
};

// Lấy danh sách tất cả tin nhắn
exports.getAllMessages = function callee$0$0(req, res) {
    var messages;
    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                context$1$0.prev = 0;
                context$1$0.next = 3;
                return regeneratorRuntime.awrap(Message.find().populate('senderId', 'username email').populate('receiverId', 'username email'));

            case 3:
                messages = context$1$0.sent;

                res.status(200).json(messages);
                context$1$0.next = 10;
                break;

            case 7:
                context$1$0.prev = 7;
                context$1$0.t0 = context$1$0['catch'](0);

                res.status(500).json({ message: 'Error fetching messages', error: context$1$0.t0 });

            case 10:
            case 'end':
                return context$1$0.stop();
        }
    }, null, _this, [[0, 7]]);
};

// Xóa tin nhắn theo ID
exports.deleteMessage = function callee$0$0(req, res) {
    var messageId, message;
    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                context$1$0.prev = 0;
                messageId = req.params.messageId;
                context$1$0.next = 4;
                return regeneratorRuntime.awrap(Message.findById(messageId));

            case 4:
                message = context$1$0.sent;

                if (message) {
                    context$1$0.next = 7;
                    break;
                }

                return context$1$0.abrupt('return', res.status(404).json({ message: 'Message not found' }));

            case 7:
                context$1$0.next = 9;
                return regeneratorRuntime.awrap(Message.findByIdAndDelete(messageId));

            case 9:
                res.status(200).json({ message: 'Message deleted successfully' });
                context$1$0.next = 15;
                break;

            case 12:
                context$1$0.prev = 12;
                context$1$0.t0 = context$1$0['catch'](0);

                res.status(500).json({ message: 'Error deleting message', error: context$1$0.t0 });

            case 15:
            case 'end':
                return context$1$0.stop();
        }
    }, null, _this, [[0, 12]]);
};

// Lấy danh sách thông báo
exports.getAllNotifications = function callee$0$0(req, res) {
    var notifications;
    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                context$1$0.prev = 0;
                context$1$0.next = 3;
                return regeneratorRuntime.awrap(Notification.find().populate('userId', 'username email'));

            case 3:
                notifications = context$1$0.sent;

                res.status(200).json(notifications);
                context$1$0.next = 10;
                break;

            case 7:
                context$1$0.prev = 7;
                context$1$0.t0 = context$1$0['catch'](0);

                res.status(500).json({ message: 'Error fetching notifications', error: context$1$0.t0 });

            case 10:
            case 'end':
                return context$1$0.stop();
        }
    }, null, _this, [[0, 7]]);
};

// Xóa thông báo theo ID
exports.deleteNotification = function callee$0$0(req, res) {
    var notificationId, notification;
    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                context$1$0.prev = 0;
                notificationId = req.params.notificationId;
                context$1$0.next = 4;
                return regeneratorRuntime.awrap(Notification.findById(notificationId));

            case 4:
                notification = context$1$0.sent;

                if (notification) {
                    context$1$0.next = 7;
                    break;
                }

                return context$1$0.abrupt('return', res.status(404).json({ message: 'Notification not found' }));

            case 7:
                context$1$0.next = 9;
                return regeneratorRuntime.awrap(Notification.findByIdAndDelete(notificationId));

            case 9:
                res.status(200).json({ message: 'Notification deleted successfully' });
                context$1$0.next = 15;
                break;

            case 12:
                context$1$0.prev = 12;
                context$1$0.t0 = context$1$0['catch'](0);

                res.status(500).json({ message: 'Error deleting notification', error: context$1$0.t0 });

            case 15:
            case 'end':
                return context$1$0.stop();
        }
    }, null, _this, [[0, 12]]);
};

// Lấy danh sách bạn bè
exports.getAllFriendships = function callee$0$0(req, res) {
    var friendships;
    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                context$1$0.prev = 0;
                context$1$0.next = 3;
                return regeneratorRuntime.awrap(Friendship.find().populate('requester', 'username email').populate('recipient', 'username email'));

            case 3:
                friendships = context$1$0.sent;

                res.status(200).json(friendships);
                context$1$0.next = 10;
                break;

            case 7:
                context$1$0.prev = 7;
                context$1$0.t0 = context$1$0['catch'](0);

                res.status(500).json({ message: 'Error fetching friendships', error: context$1$0.t0 });

            case 10:
            case 'end':
                return context$1$0.stop();
        }
    }, null, _this, [[0, 7]]);
};

// Xóa mối quan hệ bạn bè theo ID
exports.deleteFriendship = function callee$0$0(req, res) {
    var friendshipId, friendship;
    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                context$1$0.prev = 0;
                friendshipId = req.params.friendshipId;
                context$1$0.next = 4;
                return regeneratorRuntime.awrap(Friendship.findById(friendshipId));

            case 4:
                friendship = context$1$0.sent;

                if (friendship) {
                    context$1$0.next = 7;
                    break;
                }

                return context$1$0.abrupt('return', res.status(404).json({ message: 'Friendship not found' }));

            case 7:
                context$1$0.next = 9;
                return regeneratorRuntime.awrap(Friendship.findByIdAndDelete(friendshipId));

            case 9:
                res.status(200).json({ message: 'Friendship deleted successfully' });
                context$1$0.next = 15;
                break;

            case 12:
                context$1$0.prev = 12;
                context$1$0.t0 = context$1$0['catch'](0);

                res.status(500).json({ message: 'Error deleting friendship', error: context$1$0.t0 });

            case 15:
            case 'end':
                return context$1$0.stop();
        }
    }, null, _this, [[0, 12]]);
};