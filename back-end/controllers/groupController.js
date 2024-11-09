const Group = require('../models/group');
const Post = require('../models/post');

// Tạo nhóm mới
exports.createGroup = async (req, res) => {
    try {
        const { name, description, privacy } = req.body;
        const creator = req.userId; // Lấy ID người dùng từ xác thực

        const newGroup = new Group({
            name,
            description,
            creator,
            members: [creator], // Thêm người tạo vào danh sách thành viên
            privacy
        });

        await newGroup.save();
        res.status(201).json(newGroup);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
};


// Thêm thành viên vào nhóm
exports.addMember = async (req, res) => {
    try {
        const { groupId, userId } = req.body;

        const group = await Group.findById(groupId);
        if (!group) return res.status(404).json({ message: 'Group not found' });

        // Kiểm tra quyền của người dùng (người quản trị)
        if (group.creator.toString() !== req.userId) {
            return res.status(403).json({ message: 'Only the group creator can add members' });
        }

        if (!group.members.includes(userId)) {
            group.members.push(userId);
            await group.save();
        }

        res.status(200).json(group);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
};

// Xóa thành viên khỏi nhóm
exports.removeMember = async (req, res) => {
    try {
        const { groupId, userId } = req.body;

        const group = await Group.findById(groupId);
        if (!group) return res.status(404).json({ message: 'Group not found' });

        if (group.creator.toString() !== req.userId) {
            return res.status(403).json({ message: 'Only the group creator can remove members' });
        }

        group.members = group.members.filter((member) => member.toString() !== userId);
        await group.save();

        res.status(200).json(group);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
};

// Đăng bài trong nhóm
exports.createGroupPost = async (req, res) => {
    try {
        const { groupId, content, image } = req.body;
        const userId = req.userId;

        const group = await Group.findById(groupId);
        if (!group) return res.status(404).json({ message: 'Group not found' });

        if (!group.members.includes(userId)) {
            return res.status(403).json({ message: 'You must be a member to post in this group' });
        }

        const newPost = new Post({
            groupId,
            userId,
            content,
            image,
            visibility: 'group' // Đặt visibility là "group" cho bài đăng trong nhóm
        });

        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
};


// Lấy danh sách bài đăng trong nhóm
exports.getGroupPosts = async (req, res) => {
    try {
        const { groupId } = req.params;

        const group = await Group.findById(groupId);
        if (!group) return res.status(404).json({ message: 'Group not found' });

        if (!group.members.includes(req.userId)) {
            return res.status(403).json({ message: 'You must be a member to view posts in this group' });
        }

        const posts = await Post.find({ groupId });
        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
};

// Rời khỏi nhóm
exports.leaveGroup = async (req, res) => {
    try {
        const { groupId } = req.body;
        const userId = req.userId;

        const group = await Group.findById(groupId);
        if (!group) return res.status(404).json({ message: 'Group not found' });

        if (!group.members.includes(userId)) {
            return res.status(403).json({ message: 'You are not a member of this group' });
        }

        group.members = group.members.filter((member) => member.toString() !== userId);
        await group.save();

        res.status(200).json({ message: 'You have left the group' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
};


// Lấy danh sách nhóm mà người dùng tham gia
exports.getUserGroups = async (req, res) => {
    try {
      const userId = req.userId; // Lấy userId từ middleware xác thực người dùng
  
      // Tìm tất cả các nhóm mà người dùng tham gia
      const groups = await Group.find({ members: userId });
  
      if (!groups || groups.length === 0) {
        return res.status(404).json({ message: 'No groups found for this user' });
      }
  
      res.status(200).json(groups); // Trả về danh sách nhóm người dùng tham gia
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error', error });
    }
  };