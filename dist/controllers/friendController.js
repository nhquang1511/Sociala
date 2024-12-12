'use strict';

var _this = this;

var Friendship = require('../models/Friendship');
var User = require('../models/user'); // Thay thế bằng đường dẫn đúng tới file model User

// POST /api/friends/request
exports.sendFriendRequest = function callee$0$0(req, res) {
    var requesterId, // ID người gửi yêu cầu
    recipientId, existingRequest, friendship;
    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                context$1$0.prev = 0;
                requesterId = req.userId;
                recipientId = req.body.recipientId;
                context$1$0.next = 5;
                return regeneratorRuntime.awrap(Friendship.findOne({
                    requester: requesterId,
                    recipient: recipientId
                }));

            case 5:
                existingRequest = context$1$0.sent;

                if (!existingRequest) {
                    context$1$0.next = 8;
                    break;
                }

                return context$1$0.abrupt('return', res.status(400).json({ message: 'Friend request already sent' }));

            case 8:
                friendship = new Friendship({
                    requester: requesterId,
                    recipient: recipientId,
                    status: 'pending'
                });
                context$1$0.next = 11;
                return regeneratorRuntime.awrap(friendship.save());

            case 11:
                res.status(201).json({ message: 'Friend request sent' });
                context$1$0.next = 17;
                break;

            case 14:
                context$1$0.prev = 14;
                context$1$0.t0 = context$1$0['catch'](0);

                res.status(500).json({ message: 'Server error', error: context$1$0.t0 });

            case 17:
            case 'end':
                return context$1$0.stop();
        }
    }, null, _this, [[0, 14]]);
};

// POST /api/friends/accept
exports.acceptFriendRequest = function callee$0$0(req, res) {
    var requesterId, recipientId, friendship;
    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                context$1$0.prev = 0;
                requesterId = req.body.requesterId;
                recipientId = req.userId;
                context$1$0.next = 5;
                return regeneratorRuntime.awrap(Friendship.findOneAndUpdate({ requester: requesterId, recipient: recipientId, status: 'pending' }, { status: 'accepted' }, { 'new': true }));

            case 5:
                friendship = context$1$0.sent;

                if (friendship) {
                    context$1$0.next = 8;
                    break;
                }

                return context$1$0.abrupt('return', res.status(404).json({ message: 'Friend request not found' }));

            case 8:

                res.status(200).json({ message: 'Friend request accepted' });
                context$1$0.next = 14;
                break;

            case 11:
                context$1$0.prev = 11;
                context$1$0.t0 = context$1$0['catch'](0);

                res.status(500).json({ message: 'Server error', error: context$1$0.t0 });

            case 14:
            case 'end':
                return context$1$0.stop();
        }
    }, null, _this, [[0, 11]]);
};

// DELETE /api/friends/reject
exports.rejectFriendRequest = function callee$0$0(req, res) {
    var requesterId, recipientId, friendship;
    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                context$1$0.prev = 0;
                requesterId = req.body.requesterId;
                recipientId = req.userId;
                context$1$0.next = 5;
                return regeneratorRuntime.awrap(Friendship.findOneAndDelete({
                    requester: requesterId,
                    recipient: recipientId,
                    status: 'pending'
                }));

            case 5:
                friendship = context$1$0.sent;

                if (friendship) {
                    context$1$0.next = 8;
                    break;
                }

                return context$1$0.abrupt('return', res.status(404).json({ message: 'Friend request not found' }));

            case 8:

                res.status(200).json({ message: 'Friend request rejected' });
                context$1$0.next = 14;
                break;

            case 11:
                context$1$0.prev = 11;
                context$1$0.t0 = context$1$0['catch'](0);

                res.status(500).json({ message: 'Server error', error: context$1$0.t0 });

            case 14:
            case 'end':
                return context$1$0.stop();
        }
    }, null, _this, [[0, 11]]);
};

// DELETE /api/friends/remove
exports.removeFriend = function callee$0$0(req, res) {
    var userId, friendId, friendship;
    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                context$1$0.prev = 0;
                userId = req.userId;
                friendId = req.body.friendId;
                context$1$0.next = 5;
                return regeneratorRuntime.awrap(Friendship.findOneAndDelete({
                    $or: [{ requester: userId, recipient: friendId, status: 'accepted' }, { requester: friendId, recipient: userId, status: 'accepted' }]
                }));

            case 5:
                friendship = context$1$0.sent;

                if (friendship) {
                    context$1$0.next = 8;
                    break;
                }

                return context$1$0.abrupt('return', res.status(404).json({ message: 'Friendship not found' }));

            case 8:

                res.status(200).json({ message: 'Friend removed' });
                context$1$0.next = 14;
                break;

            case 11:
                context$1$0.prev = 11;
                context$1$0.t0 = context$1$0['catch'](0);

                res.status(500).json({ message: 'Server error', error: context$1$0.t0 });

            case 14:
            case 'end':
                return context$1$0.stop();
        }
    }, null, _this, [[0, 11]]);
};
// GET /api/friends/list
exports.getFriendsList = function callee$0$0(req, res) {
    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
        var _this2 = this;

        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                context$1$0.prev = 0;
                context$1$0.next = 3;
                return regeneratorRuntime.awrap((function callee$1$0() {
                    var userId, friendships, friendIds, friends;
                    return regeneratorRuntime.async(function callee$1$0$(context$2$0) {
                        while (1) switch (context$2$0.prev = context$2$0.next) {
                            case 0:
                                userId = req.userId;
                                context$2$0.next = 3;
                                return regeneratorRuntime.awrap(Friendship.find({
                                    $or: [{ requester: userId, status: 'accepted' }, { recipient: userId, status: 'accepted' }]
                                }));

                            case 3:
                                friendships = context$2$0.sent;
                                friendIds = friendships.map(function (friendship) {
                                    return friendship.requester.toString() === userId.toString() ? friendship.recipient : friendship.requester;
                                });
                                context$2$0.next = 7;
                                return regeneratorRuntime.awrap(User.find({ _id: { $in: friendIds } }).select('username email name avatar'));

                            case 7:
                                friends = context$2$0.sent;

                                res.status(200).json(friends);

                            case 9:
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

                console.error("Error fetching friends list:", context$1$0.t0); // Log lỗi chi tiết ra console
                res.status(500).json({ message: 'Server error', error: context$1$0.t0.message || context$1$0.t0 });

            case 9:
            case 'end':
                return context$1$0.stop();
        }
    }, null, _this, [[0, 5]]);
};

exports.getSentRequests = function callee$0$0(req, res) {
    var userId, sentRequests;
    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                context$1$0.prev = 0;
                userId = req.userId;
                context$1$0.next = 4;
                return regeneratorRuntime.awrap(Friendship.find({
                    recipient: userId
                }).populate('recipient', 'username email avatar').populate('requester', 'username email avatar'));

            case 4:
                sentRequests = context$1$0.sent;
                // Populate thêm thông tin của recipient

                res.status(200).json(sentRequests);
                context$1$0.next = 12;
                break;

            case 8:
                context$1$0.prev = 8;
                context$1$0.t0 = context$1$0['catch'](0);

                console.error('Error fetching sent friend requests:', context$1$0.t0);
                res.status(500).json({ message: 'Server error', error: context$1$0.t0 });

            case 12:
            case 'end':
                return context$1$0.stop();
        }
    }, null, _this, [[0, 8]]);
};

// Kiểm tra nếu đã có yêu cầu kết bạn
// ID của người dùng hiện tại từ middleware xác thực

// Tìm kiếm tất cả các mối quan hệ bạn bè có trạng thái 'accepted' với userId

// Lấy danh sách ID của bạn bè

// Truy vấn để lấy thông tin chi tiết của bạn bè
// Lấy userId từ middleware xác thực

// Tìm tất cả yêu cầu kết bạn mà user hiện tại đã gửi