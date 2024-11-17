import React, { useState } from "react";
import "../styles/ListPost.css"; // File CSS riêng cho ListPost
import { ReactComponent as Share } from "../assets/icons/share.svg";
import { ReactComponent as Like } from "../assets/icons/like.svg";
import { ReactComponent as CommentIcon } from "../assets/icons/comment.svg";
import CommentBox from "./CommentBox"; // Import CommentBox
import CommentsList from "./CommentsList"; // Import CommentsList

const ListPost = () => {
    // Temporary mock data for posts
    const posts = [
        { id: 1, username: "User 1", content: "Hello world!", image: "https://www.10wallpaper.com/wallpaper/1366x768/1303/kina_snow_girl_blizzard_braid-Anime_characters_HD_wallpaper_1366x768.jpg", likes: 3, comments: [], shares: 2 },
        { id: 2, username: "User 2", content: "Beautiful day!", image: "https://via.placeholder.com/150", likes: 7, comments: [], shares: 1 },
      ];

    // State for managing likes
    const [likedPosts, setLikedPosts] = useState([]);

    // Handle like button click
    const handleLike = (postId) => {
        setLikedPosts((prev) =>
            prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId]
        );
    };
    const handleAddComment = (postId, commentText) => {
        const postIndex = posts.findIndex((post) => post.id === postId);
        if (postIndex !== -1) {
          posts[postIndex].comments.push({ username: "Current User", text: commentText });
        }
      };
    return (
        <div className="list-post">
            {posts.map((post) => (
                <div key={post.id} className="post">
                    <div className="post-header">
                        <img
                            src="https://www.10wallpaper.com/wallpaper/1366x768/1303/kina_snow_girl_blizzard_braid-Anime_characters_HD_wallpaper_1366x768.jpg"
                            alt="User Avatar"
                            className="post-avatar"
                        />
                        <p className="post-username">{post.username}</p>
                    </div>
                    <div className="post-content">
                        <p>{post.content}</p>
                        {post.image && <img src={post.image} alt="Post" className="post-image" />}
                    </div>

                    {/* Like, Comment, Share buttons */}
                    <div className="post-actions">
                        <button
                            className={`like-btn ${likedPosts.includes(post.id) ? "liked" : ""}`}
                            onClick={() => handleLike(post.id)}
                        >
                            <Like />
                            {likedPosts.includes(post.id) ? "Unlike" : "Like"}
                        </button>
                        <button className="comment-btn"><CommentIcon /> Comment</button>
                        <button className="share-btn"><Share /> Share</button>
                    </div>

                    {/* Display likes, comments, and shares */}
                    <div className="post-stats">
                        <span>{post.likes + (likedPosts.includes(post.id) ? 1 : 0)} Likes</span>
                        <span>{post.comments} Comments</span>
                        <span>{post.shares} Shares</span>
                    </div>
                    {/* CommentBox to add new comments */}
                    <CommentBox postId={post.id} onAddComment={handleAddComment} />

                    {/* List of existing comments */}
                    <CommentsList comments={post.comments} />
                </div>
            ))}
        </div>
    );
};

export default ListPost;
