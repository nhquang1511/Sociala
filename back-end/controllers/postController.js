const Post = require('../models/post'); // Mô hình Post
const User = require('../models/user'); // Mô hình User

// API Tạo Bài Viết
exports.createPost = async (req, res) => {
    try {
        const { content, image, video, visibility } = req.body;
        const userId = req.userId; // Lấy userId từ middleware xác thực

        // Kiểm tra nếu nội dung bài viết không có
        if (!content) {
            return res.status(400).json({ message: 'Content is required' });
        }

        let imageUrl = null;
        if (req.file) { // Kiểm tra nếu có file được tải lên
            imageUrl = req.file.path; // URL trả về từ Cloudinary qua multer
        }
        // Tạo bài viết mới
        const newPost = new Post({
            userId,
            content,
            image: imageUrl,
            video,
            visibility
        });
        
          

        

        // Lưu bài viết vào cơ sở dữ liệu
        await newPost.save();
        res.status(201).json(newPost); // Trả về bài viết vừa tạo
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
};
// API Lấy Danh Sách Bài Viết của Người Dùng
exports.getUserPosts = async (req, res) => {
    try {
        const userId = req.userId; // Lấy userId từ middleware xác thực

        // Lấy danh sách bài viết của người dùng với điều kiện visibility
        const posts = await Post.find({
            $or: [
                { userId: userId, visibility: 'private' }, // Bài viết riêng tư của người dùng
                { visibility: 'public' }, // Bài viết công khai
                { userId: userId, visibility: 'friends' } // Bài viết bạn bè
            ]
        }).populate('userId', 'username') // Lấy thông tin người đăng bài viết
            .sort({ createdAt: -1 }); // Sắp xếp bài viết theo thời gian (mới nhất trước)

        res.status(200).json(posts); // Trả về danh sách bài viết
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
};

// API Like Bài Viết
exports.likePost = async (req, res) => {
    try {
        const { postId } = req.body; // Lấy postId từ yêu cầu
        const userId = req.userId; // Lấy userId từ middleware xác thực

        // Kiểm tra xem bài viết có tồn tại không
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Kiểm tra xem người dùng đã like bài viết chưa
        if (post.likes.includes(userId)) {
            return res.status(400).json({ message: 'You already liked this post' });
        }

        // Thêm like vào bài viết
        post.likes.push(userId);
        await post.save();

        res.status(201).json({ message: 'Post liked successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
};


// API Bình Luận Bài Viết
exports.commentPost = async (req, res) => {
    try {
        const { postId, comment } = req.body; // Lấy postId và nội dung comment từ body yêu cầu
        const userId = req.userId; // Lấy userId từ middleware xác thực

        // Kiểm tra xem bài viết có tồn tại không
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Tạo bình luận mới
        const newComment = {
            userId,
            comment,
            createdAt: new Date()
        };

        // Thêm bình luận vào bài viết
        post.comments.push(newComment);
        await post.save(); // Lưu bài viết với bình luận mới

        res.status(201).json(newComment); // Trả về bình luận vừa tạo
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
};

// API Bỏ Thích Bài Viết
exports.unlikePost = async (req, res) => {
    try {
        const { postId } = req.body; // Lấy postId từ body yêu cầu
        const userId = req.userId; // Lấy userId từ middleware xác thực

        // Kiểm tra xem bài viết có tồn tại không
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Kiểm tra xem người dùng đã thích bài viết hay chưa
        if (!post.likes.includes(userId)) {
            return res.status(400).json({ message: 'You have not liked this post' });
        }

        // Loại bỏ người dùng khỏi mảng likes
        post.likes = post.likes.filter(like => like.toString() !== userId.toString());

        // Lưu bài viết sau khi bỏ thích
        await post.save();

        res.status(200).json({ message: 'Post unliked successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
};

// API Xóa Bình Luận
exports.deleteComment = async (req, res) => {
    try {
        const { postId, commentId } = req.body; // Lấy postId và commentId từ body yêu cầu
        const userId = req.userId; // Lấy userId từ middleware xác thực

        // Kiểm tra xem bài viết có tồn tại không
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Kiểm tra xem bình luận có tồn tại không
        const comment = post.comments.id(commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        // Kiểm tra xem người dùng có phải là người tạo bình luận không
        if (comment.userId.toString() !== userId.toString()) {
            return res.status(403).json({ message: 'You can only delete your own comments' });
        }

        // Xóa bình luận khỏi bài viết
        post.comments.pull(commentId);

        // Lưu bài viết sau khi xóa bình luận
        await post.save();

        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
};


// API Sửa Bài Viết
exports.editPost = async (req, res) => {
    try {
        const { postId, content, image, video, visibility } = req.body; // Lấy thông tin từ body yêu cầu
        const userId = req.userId; // Lấy userId từ middleware xác thực

        // Kiểm tra xem bài viết có tồn tại không
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Kiểm tra xem người dùng có phải là người tạo bài viết không
        if (post.userId.toString() !== userId.toString()) {
            return res.status(403).json({ message: 'You can only edit your own posts' });
        }
        

        // Cập nhật bài viết với các trường mới
        post.content = content || post.content; // Nếu không cung cấp, giữ nguyên giá trị cũ
        post.video = video || post.video;
        post.visibility = visibility || post.visibility;

        let imageUrl = null;
        if (req.file) { // Kiểm tra nếu có file được tải lên
            imageUrl = req.file.path; // URL trả về từ Cloudinary qua multer
        }
        post.image = imageUrl || post.video;
        // Cập nhật thời gian sửa đổi
        post.updatedAt = Date.now();

        // Lưu bài viết đã sửa vào cơ sở dữ liệu
        await post.save();

        res.status(200).json(post); // Trả về bài viết đã sửa
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
};


// API Sửa Bình Luận
exports.editComment = async (req, res) => {
    try {
        const { postId, commentId, comment } = req.body; // Lấy thông tin từ body yêu cầu
        const userId = req.userId; // Lấy userId từ middleware xác thực

        // Kiểm tra xem bài viết có tồn tại không
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Kiểm tra xem bình luận có tồn tại không
        const existingComment = post.comments.id(commentId);
        if (!existingComment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        // Kiểm tra xem người dùng có phải là người tạo bình luận không
        if (existingComment.userId.toString() !== userId.toString()) {
            return res.status(403).json({ message: 'You can only edit your own comments' });
        }

        // Cập nhật nội dung bình luận
        existingComment.comment = comment || existingComment.comment;
        existingComment.updatedAt = Date.now();

        // Lưu bài viết sau khi sửa bình luận
        await post.save();

        res.status(200).json(existingComment); // Trả về bình luận đã sửa
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
};