const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const groupRoutes = require('./routes/groupRoutes');
const friendRoutes = require('./routes/friendRoutes');
const postRoutes = require('./routes/postRoutes');

const corsOptions = {
   origin: 'http://localhost:4000', // URL của frontend
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

app.use(express.json());

// Route cơ bản
app.get('/', (req, res) => {
   res.send('Hello, World!');
});

app.use('/api/users', userRoutes);
app.use('/api', groupRoutes);
app.use('/api/friends', friendRoutes);
app.use('/api/posts', postRoutes);

// Khởi động server
app.listen(PORT, () => {
   console.log(`Server is running on http://localhost:${PORT}`);
});


