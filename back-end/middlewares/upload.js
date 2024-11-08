// middlewares/upload.js
const multer = require('multer');

// Thiết lập nơi lưu trữ file và tên file
const storage = multer.memoryStorage();

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Giới hạn kích thước ảnh là 5MB
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true); // Chấp nhận file là ảnh
        } else {
            cb(new Error('Not an image! Please upload an image.'), false);
        }
    }
});

module.exports = upload;
