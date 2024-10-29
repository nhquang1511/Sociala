import mongoose from 'mongoose';
import crypto from 'crypto'
// user(name,email,created,hashed_password,salt)
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'Name is required'
    },
    email: {
        type: String,
        trim: true,
        unique: 'Email already exists',
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
        required: 'Email is required'
    },
    created: {
        type:
            Date, 
            default: Date.now
    },
    updated: Date,
    hashed_password: {// represent the encrypted user password 
        type: String,
        required: "Password is required"
    },
    salt: String,
    
})
// tạo thuộc tính ảo virtual cho password chỉ tồn tại trong quá trình sử lý dữ liệu
UserSchema
  .virtual('password')
  .set(function(password) {
    this._password = password // lưu mật khẩu vào một biến tạm thời 
    this.salt = this.makeSalt() //  Tạo giá trị "salt" ngẫu nhiên bằng phương thức makeSalt()
    this.hashed_password = this.encryptPassword(password) //Mã hóa (hash) mật khẩu bằng phương thức encryptPassword()
  })
  .get(function() {
    return this._password
  })

// tạo 3 method: authenticate, encryptPassword, makeSalt

UserSchema.methods = {
  authenticate: function(plainText) { //Xác thực người dùng. Hàm này nhận vào một mật khẩu không mã hóa (plainText) từ người dùng. Sau đó, hàm sẽ mã hóa mật khẩu đó bằng phương thức encryptPassword.So sánh kết quả của mật khẩu đã mã hóa với giá trị hashed_password đã lưu trong cơ sở dữ liệu.Nếu hai giá trị này trùng khớp, trả về true, nếu không trả về false.
    return this.encryptPassword(plainText) === this.hashed_password
  },
  encryptPassword: function(password) { // Mã hóa mật khẩu.
    if (!password) return '' //Nếu mật khẩu không tồn tại, trả về một chuỗi rỗng ('').
    try { // Nếu mật khẩu tồn tại, hàm sử dụng thư viện crypto để mã hóa mật khẩu.
      return crypto
        .createHmac('sha1', this.salt) //Sử dụng thuật toán HMAC-SHA1,this.salt được sử dụng như là khóa mã hóa.
        .update(password)  // Mật khẩu được truyền vào dưới dạng password
        .digest('hex') // chuyển thành dạng hex
    } catch (err) {
      return '' //Nếu có lỗi xảy ra trong quá trình mã hóa, trả về chuỗi rỗng.
    }
  },
  makeSalt: function() { // Tạo "salt" ngẫu nhiên để dùng trong quá trình mã hóa mật khẩu.
    return Math.round((new Date().valueOf() * Math.random())) // Sử dụng phương pháp lấy thời gian hiện tại kết hợp với một giá trị ngẫu nhiên
    + '' // để chuyển kết quả thành chuỗi string
  }
}



// Password field validation
UserSchema.path('hashed_password')//Chọn trường hashed_password trong schema để áp dụng validation.
  .validate(function(v) { //Thiết lập một hàm kiểm tra tính hợp lệ (validator) cho trường hashed_password
  if (this._password && this._password.length < 6) {//Nếu mật khẩu gốc có ít hơn 6 ký tự, nó sẽ bị coi là không hợp lệ.Nếu mật khẩu quá ngắn, phương thức invalidate() sẽ tạo lỗi validation và thông báo rằng "Password must be at least 6 characters.".
    this.invalidate('password', 'Password must be at least 6 characters.')
  }
  if (this.isNew && !this._password) { 
    this.invalidate('password', 'Password is required')
  }
}, null)


export default mongoose.model('User', UserSchema)
