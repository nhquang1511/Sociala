const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String },
    dateOfBirth: { type: Date },
    phone:{type:String} , // Thuộc tính ngày sinh
    gender: { type: String, enum: ['male', 'female', 'other'] },  // Thuộc tính giới tính
});

module.exports = mongoose.model('User', userSchema);
