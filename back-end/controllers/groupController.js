const Group = require('../models/group');

// Tạo nhóm mới
exports.createGroup = async (req, res) => {
    try {
        const { name, description } = req.body;
        const creatorId = req.userId; // Lấy creatorId từ token JWT

        const newGroup = new Group({
            name,
            description,
            creatorId,
            members: [creatorId] // Tự động thêm người tạo vào nhóm
        });

        await newGroup.save();
        res.status(201).json({ message: 'Group created successfully', group: newGroup });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
