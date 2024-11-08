const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Đăng ký người dùng mới
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Kiểm tra xem email đã tồn tại chưa
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already exists' });

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo người dùng mới
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Đăng nhập người dùng
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Kiểm tra xem người dùng có tồn tại không
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // So sánh mật khẩu
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ message: 'Invalid credentials' });

    // Tạo token
    // Tạo JWT
    const token = jwt.sign(
      { id: user._id, email: user.email }, // Payload
      process.env.JWT_SECRET, // Mã bí mật (cần khai báo trong biến môi trường)
      { expiresIn: '1h' } // Thời gian hết hạn token
    );
    res.json({ token, userId: user._id });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Lấy thông tin người dùng
exports.getUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updates = req.body;

    // Tìm người dùng cần cập nhật
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Cập nhật thông tin người dùng từ body
    Object.keys(updates).forEach((key) => {
      user[key] = updates[key];
    });

    // Cập nhật avatar nếu có file upload
    if (req.file) {
      user.avatar = {
        data: req.file.buffer,
        contentType: req.file.mimetype
      };
    }

    // Lưu thông tin đã cập nhật
    await user.save();

    // Loại bỏ trường mật khẩu trước khi trả về dữ liệu người dùng
    user.password = undefined;
    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};


exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();  // Sử dụng Mongoose để lấy tất cả người dùng
    res.status(200).json(users);  // Trả về danh sách người dùng với mã trạng thái 200
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server Error' });  // Nếu có lỗi, trả về lỗi server
  }
};
// Xóa người dùng theo ID
exports.deleteUser = async (req, res) => {
  const userId = req.params.id;  // Lấy ID từ tham số URL

  try {
    const user = await User.findByIdAndDelete(userId);  // Tìm và xóa người dùng bằng ID

    if (!user) {
      return res.status(404).json({ message: 'User not found' });  // Nếu không tìm thấy người dùng
    }
    res.status(200).json({ message: 'User deleted successfully'});  // Trả về thông báo thành công
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Server Error' });  // Nếu có lỗi trong quá trình xóa
  }
};


exports.getUserAvatar = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || !user.avatar.data) return res.status(404).json({ message: 'Avatar not found' });

    res.set('Content-Type', user.avatar.contentType);
    res.send(user.avatar.data);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};