'use strict';

var _this = this;

var Group = require('../models/group');
var Post = require('../models/post');

// Tạo nhóm mới
exports.createGroup = function callee$0$0(req, res) {
    var _req$body, _name, description, privacy, creator, newGroup;

    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                context$1$0.prev = 0;
                _req$body = req.body;
                _name = _req$body.name;
                description = _req$body.description;
                privacy = _req$body.privacy;
                creator = req.userId;
                newGroup = new Group({
                    name: _name,
                    description: description,
                    creator: creator,
                    members: [creator], // Thêm người tạo vào danh sách thành viên
                    privacy: privacy
                });
                context$1$0.next = 9;
                return regeneratorRuntime.awrap(newGroup.save());

            case 9:
                res.status(201).json(newGroup);
                context$1$0.next = 16;
                break;

            case 12:
                context$1$0.prev = 12;
                context$1$0.t0 = context$1$0['catch'](0);

                console.error(context$1$0.t0);
                res.status(500).json({ message: 'Server error', error: context$1$0.t0 });

            case 16:
            case 'end':
                return context$1$0.stop();
        }
    }, null, _this, [[0, 12]]);
};

// Thêm thành viên vào nhóm
exports.addMember = function callee$0$0(req, res) {
    var _req$body2, groupId, userId, group;

    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                context$1$0.prev = 0;
                _req$body2 = req.body;
                groupId = _req$body2.groupId;
                userId = _req$body2.userId;
                context$1$0.next = 6;
                return regeneratorRuntime.awrap(Group.findById(groupId));

            case 6:
                group = context$1$0.sent;

                if (group) {
                    context$1$0.next = 9;
                    break;
                }

                return context$1$0.abrupt('return', res.status(404).json({ message: 'Group not found' }));

            case 9:
                if (!(group.creator.toString() !== req.userId)) {
                    context$1$0.next = 11;
                    break;
                }

                return context$1$0.abrupt('return', res.status(403).json({ message: 'Only the group creator can add members' }));

            case 11:
                if (group.members.includes(userId)) {
                    context$1$0.next = 15;
                    break;
                }

                group.members.push(userId);
                context$1$0.next = 15;
                return regeneratorRuntime.awrap(group.save());

            case 15:

                res.status(200).json(group);
                context$1$0.next = 22;
                break;

            case 18:
                context$1$0.prev = 18;
                context$1$0.t0 = context$1$0['catch'](0);

                console.error(context$1$0.t0);
                res.status(500).json({ message: 'Server error', error: context$1$0.t0 });

            case 22:
            case 'end':
                return context$1$0.stop();
        }
    }, null, _this, [[0, 18]]);
};

// Xóa thành viên khỏi nhóm
exports.removeMember = function callee$0$0(req, res) {
    var _ret;

    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
        var _this2 = this;

        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                context$1$0.prev = 0;
                context$1$0.next = 3;
                return regeneratorRuntime.awrap((function callee$1$0() {
                    var _req$body3, groupId, userId, group;

                    return regeneratorRuntime.async(function callee$1$0$(context$2$0) {
                        while (1) switch (context$2$0.prev = context$2$0.next) {
                            case 0:
                                _req$body3 = req.body;
                                groupId = _req$body3.groupId;
                                userId = _req$body3.userId;
                                context$2$0.next = 5;
                                return regeneratorRuntime.awrap(Group.findById(groupId));

                            case 5:
                                group = context$2$0.sent;

                                if (group) {
                                    context$2$0.next = 8;
                                    break;
                                }

                                return context$2$0.abrupt('return', {
                                    v: res.status(404).json({ message: 'Group not found' })
                                });

                            case 8:
                                if (!(group.creator.toString() !== req.userId)) {
                                    context$2$0.next = 10;
                                    break;
                                }

                                return context$2$0.abrupt('return', {
                                    v: res.status(403).json({ message: 'Only the group creator can remove members' })
                                });

                            case 10:

                                group.members = group.members.filter(function (member) {
                                    return member.toString() !== userId;
                                });
                                context$2$0.next = 13;
                                return regeneratorRuntime.awrap(group.save());

                            case 13:

                                res.status(200).json(group);

                            case 14:
                            case 'end':
                                return context$2$0.stop();
                        }
                    }, null, _this2);
                })());

            case 3:
                _ret = context$1$0.sent;

                if (!(typeof _ret === 'object')) {
                    context$1$0.next = 6;
                    break;
                }

                return context$1$0.abrupt('return', _ret.v);

            case 6:
                context$1$0.next = 12;
                break;

            case 8:
                context$1$0.prev = 8;
                context$1$0.t0 = context$1$0['catch'](0);

                console.error(context$1$0.t0);
                res.status(500).json({ message: 'Server error', error: context$1$0.t0 });

            case 12:
            case 'end':
                return context$1$0.stop();
        }
    }, null, _this, [[0, 8]]);
};

// Đăng bài trong nhóm
exports.createGroupPost = function callee$0$0(req, res) {
    var _req$body4, groupId, content, image, userId, group, newPost;

    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                context$1$0.prev = 0;
                _req$body4 = req.body;
                groupId = _req$body4.groupId;
                content = _req$body4.content;
                image = _req$body4.image;
                userId = req.userId;
                context$1$0.next = 8;
                return regeneratorRuntime.awrap(Group.findById(groupId));

            case 8:
                group = context$1$0.sent;

                if (group) {
                    context$1$0.next = 11;
                    break;
                }

                return context$1$0.abrupt('return', res.status(404).json({ message: 'Group not found' }));

            case 11:
                if (group.members.includes(userId)) {
                    context$1$0.next = 13;
                    break;
                }

                return context$1$0.abrupt('return', res.status(403).json({ message: 'You must be a member to post in this group' }));

            case 13:
                newPost = new Post({
                    groupId: groupId,
                    userId: userId,
                    content: content,
                    image: image,
                    visibility: 'group' // Đặt visibility là "group" cho bài đăng trong nhóm
                });
                context$1$0.next = 16;
                return regeneratorRuntime.awrap(newPost.save());

            case 16:
                res.status(201).json(newPost);
                context$1$0.next = 23;
                break;

            case 19:
                context$1$0.prev = 19;
                context$1$0.t0 = context$1$0['catch'](0);

                console.error(context$1$0.t0);
                res.status(500).json({ message: 'Server error', error: context$1$0.t0 });

            case 23:
            case 'end':
                return context$1$0.stop();
        }
    }, null, _this, [[0, 19]]);
};

// Lấy danh sách bài đăng trong nhóm
exports.getGroupPosts = function callee$0$0(req, res) {
    var groupId, group, posts;
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
                if (group.members.includes(req.userId)) {
                    context$1$0.next = 9;
                    break;
                }

                return context$1$0.abrupt('return', res.status(403).json({ message: 'You must be a member to view posts in this group' }));

            case 9:
                context$1$0.next = 11;
                return regeneratorRuntime.awrap(Post.find({ groupId: groupId }));

            case 11:
                posts = context$1$0.sent;

                res.status(200).json(posts);
                context$1$0.next = 19;
                break;

            case 15:
                context$1$0.prev = 15;
                context$1$0.t0 = context$1$0['catch'](0);

                console.error(context$1$0.t0);
                res.status(500).json({ message: 'Server error', error: context$1$0.t0 });

            case 19:
            case 'end':
                return context$1$0.stop();
        }
    }, null, _this, [[0, 15]]);
};

// Rời khỏi nhóm
exports.leaveGroup = function callee$0$0(req, res) {
    var _ret2;

    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
        var _this3 = this;

        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                context$1$0.prev = 0;
                context$1$0.next = 3;
                return regeneratorRuntime.awrap((function callee$1$0() {
                    var groupId, userId, group;
                    return regeneratorRuntime.async(function callee$1$0$(context$2$0) {
                        while (1) switch (context$2$0.prev = context$2$0.next) {
                            case 0:
                                groupId = req.body.groupId;
                                userId = req.userId;
                                context$2$0.next = 4;
                                return regeneratorRuntime.awrap(Group.findById(groupId));

                            case 4:
                                group = context$2$0.sent;

                                if (group) {
                                    context$2$0.next = 7;
                                    break;
                                }

                                return context$2$0.abrupt('return', {
                                    v: res.status(404).json({ message: 'Group not found' })
                                });

                            case 7:
                                if (group.members.includes(userId)) {
                                    context$2$0.next = 9;
                                    break;
                                }

                                return context$2$0.abrupt('return', {
                                    v: res.status(403).json({ message: 'You are not a member of this group' })
                                });

                            case 9:

                                group.members = group.members.filter(function (member) {
                                    return member.toString() !== userId;
                                });
                                context$2$0.next = 12;
                                return regeneratorRuntime.awrap(group.save());

                            case 12:

                                res.status(200).json({ message: 'You have left the group' });

                            case 13:
                            case 'end':
                                return context$2$0.stop();
                        }
                    }, null, _this3);
                })());

            case 3:
                _ret2 = context$1$0.sent;

                if (!(typeof _ret2 === 'object')) {
                    context$1$0.next = 6;
                    break;
                }

                return context$1$0.abrupt('return', _ret2.v);

            case 6:
                context$1$0.next = 12;
                break;

            case 8:
                context$1$0.prev = 8;
                context$1$0.t0 = context$1$0['catch'](0);

                console.error(context$1$0.t0);
                res.status(500).json({ message: 'Server error', error: context$1$0.t0 });

            case 12:
            case 'end':
                return context$1$0.stop();
        }
    }, null, _this, [[0, 8]]);
};

// Lấy danh sách nhóm mà người dùng tham gia
exports.getUserGroups = function callee$0$0(req, res) {
    var userId, groups;
    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                context$1$0.prev = 0;
                userId = req.userId;
                context$1$0.next = 4;
                return regeneratorRuntime.awrap(Group.find({ members: userId }).populate('creator', 'username email avatar').populate('members', 'username email avatar'));

            case 4:
                groups = context$1$0.sent;

                if (!(!groups || groups.length === 0)) {
                    context$1$0.next = 7;
                    break;
                }

                return context$1$0.abrupt('return', res.status(404).json({ message: 'No groups found for this user' }));

            case 7:

                res.status(200).json(groups); // Trả về danh sách nhóm người dùng tham gia
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

// Lấy danh sách tất cả các nhóm hiện có
exports.getAllGroups = function callee$0$0(req, res) {
    var groups;
    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                context$1$0.prev = 0;
                context$1$0.next = 3;
                return regeneratorRuntime.awrap(Group.find().populate('creator', 'username email avatar').populate('members', 'username email avatar'));

            case 3:
                groups = context$1$0.sent;

                if (!(!groups || groups.length === 0)) {
                    context$1$0.next = 6;
                    break;
                }

                return context$1$0.abrupt('return', res.status(404).json({ message: 'No groups found' }));

            case 6:

                res.status(200).json(groups); // Trả về danh sách tất cả các nhóm
                context$1$0.next = 13;
                break;

            case 9:
                context$1$0.prev = 9;
                context$1$0.t0 = context$1$0['catch'](0);

                console.error(context$1$0.t0);
                res.status(500).json({ message: 'Server error', error: context$1$0.t0 });

            case 13:
            case 'end':
                return context$1$0.stop();
        }
    }, null, _this, [[0, 9]]);
};
// API Cập nhật nhóm
exports.updateGroup = function callee$0$0(req, res) {
    var _req$body5, groupId, _name2, description, privacy, userId, group;

    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                context$1$0.prev = 0;
                _req$body5 = req.body;
                groupId = _req$body5.groupId;
                _name2 = _req$body5.name;
                description = _req$body5.description;
                privacy = _req$body5.privacy;
                userId = req.userId;
                context$1$0.next = 9;
                return regeneratorRuntime.awrap(Group.findById(groupId));

            case 9:
                group = context$1$0.sent;

                if (group) {
                    context$1$0.next = 12;
                    break;
                }

                return context$1$0.abrupt('return', res.status(404).json({ message: 'Group not found' }));

            case 12:
                if (!(group.creator.toString() !== userId.toString())) {
                    context$1$0.next = 14;
                    break;
                }

                return context$1$0.abrupt('return', res.status(403).json({ message: 'Only the group creator can update the group' }));

            case 14:

                // Cập nhật thông tin nhóm
                group.name = _name2 || group.name;
                group.description = description || group.description;
                group.privacy = privacy || group.privacy;

                // Cập nhật avatar nếu có
                if (req.file) {
                    // Kiểm tra nếu có file được tải lên
                    group.avatar = req.file.path; // URL trả về từ Cloudinary qua multer
                }

                // Lưu thông tin nhóm đã cập nhật vào cơ sở dữ liệu
                context$1$0.next = 20;
                return regeneratorRuntime.awrap(group.save());

            case 20:

                res.status(200).json(group); // Trả về nhóm đã cập nhật
                context$1$0.next = 27;
                break;

            case 23:
                context$1$0.prev = 23;
                context$1$0.t0 = context$1$0['catch'](0);

                console.error(context$1$0.t0);
                res.status(500).json({ message: 'Server error', error: context$1$0.t0 });

            case 27:
            case 'end':
                return context$1$0.stop();
        }
    }, null, _this, [[0, 23]]);
};

// Tham gia nhóm
exports.joinGroup = function callee$0$0(req, res) {
    var groupId, userId, group;
    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                context$1$0.prev = 0;
                groupId = req.body.groupId;
                userId = req.userId;
                context$1$0.next = 5;
                return regeneratorRuntime.awrap(Group.findById(groupId));

            case 5:
                group = context$1$0.sent;

                if (group) {
                    context$1$0.next = 8;
                    break;
                }

                return context$1$0.abrupt('return', res.status(404).json({ message: 'Group not found' }));

            case 8:
                if (!group.members.includes(userId)) {
                    context$1$0.next = 10;
                    break;
                }

                return context$1$0.abrupt('return', res.status(400).json({ message: 'You are already a member of this group' }));

            case 10:
                if (!(group.privacy === 'private')) {
                    context$1$0.next = 12;
                    break;
                }

                return context$1$0.abrupt('return', res.status(403).json({ message: 'Cannot join a private group without an invitation' }));

            case 12:

                // Thêm người dùng vào danh sách thành viên
                group.members.push(userId);
                context$1$0.next = 15;
                return regeneratorRuntime.awrap(group.save());

            case 15:

                res.status(200).json({ message: 'You have successfully joined the group', group: group });
                context$1$0.next = 22;
                break;

            case 18:
                context$1$0.prev = 18;
                context$1$0.t0 = context$1$0['catch'](0);

                console.error(context$1$0.t0);
                res.status(500).json({ message: 'Server error', error: context$1$0.t0 });

            case 22:
            case 'end':
                return context$1$0.stop();
        }
    }, null, _this, [[0, 18]]);
};
// Lấy ID người dùng từ xác thực

// Kiểm tra quyền của người dùng (người quản trị)
// Lấy userId từ middleware xác thực người dùng

// Tìm tất cả các nhóm mà người dùng tham gia
// Tìm tất cả các nhóm trong cơ sở dữ liệu

// Lấy userId từ xác thực

// Tìm nhóm cần cập nhật

// Kiểm tra quyền của người dùng (người quản trị)
// Lấy ID nhóm từ yêu cầu
// Lấy ID người dùng từ middleware xác thực

// Tìm nhóm theo ID

// Kiểm tra xem người dùng đã là thành viên chưa

// Kiểm tra quyền riêng tư của nhóm