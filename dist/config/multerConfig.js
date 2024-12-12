// config/multerConfig.js
'use strict';

var multer = require('multer');

var _require = require('multer-storage-cloudinary');

var CloudinaryStorage = _require.CloudinaryStorage;

var cloudinary = require('./cloudinaryConfig');

var storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'your_folder_name', // Tên thư mục trong Cloudinary
        allowed_formats: ['jpg', 'png', 'jpeg'] // Định dạng được chấp nhận
    }
});

var upload = multer({ storage: storage });

module.exports = upload;