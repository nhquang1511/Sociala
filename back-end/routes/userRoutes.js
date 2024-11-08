const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const upload = require('../middlewares/upload');
const authenticateToken = require('../middlewares/authenticateToken');
// Lấy danh sách tất cả người dùng
router.get('/', userController.getAllUsers);

// Đăng ký người dùng
router.post('/register', userController.register);

// Đăng nhập người dùng
router.post('/login', userController.login);

// Lấy thông tin người dùng
router.get('/:id', userController.getUser);

// Cập nhật thông tin người dùng
router.put('/:id',authenticateToken ,upload.single('avatar'), userController.updateUser);

// Xóa người dùng theo ID
router.delete('/:id',authenticateToken, userController.deleteUser);

router.get('/:id/avatar', userController.getUserAvatar);

module.exports = router;