const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const friendRoutes = require('./routes/friendRoutes');
const postRoutes = require('./routes/postRoutes');
const groupRoutes  = require('./routes/groupRoutes');

const corsOptions = {
   origin: '*', // URL của frontend
   credentials: true, // Cho phép cookie
};


const mongoose = require('mongoose');


dotenv.config();


// Kết nối tới MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('MongoDB connection error:', error));



const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors(corsOptions));

app.use(express.json()); // Xử lý dữ liệu JSON từ raw
app.use(express.urlencoded({ extended: true })); // Xử lý dữ liệu từ form-data

// Route cơ bản
app.get('/', (req, res) => {
   res.send('Hello, World!');
});

app.use('/api/users', userRoutes);
app.use('/api/friends', friendRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/groups', groupRoutes);
// Khởi động server
app.listen(PORT, () => {
   console.log(`Server is running on http://localhost:${PORT}`);
});

