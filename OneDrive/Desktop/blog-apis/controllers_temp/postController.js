const mongoose = require("mongoose");
const Post = require("../models/Post");

const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    // Author is taken from verified JWT token payload.
    const post = await Post.create({
      title,
      content,
      author: req.user.id,
    });

    const populatedPost = await post.populate("author", "name email");
    return res.status(201).json({ message: "Post created successfully", post: populatedPost });
  } catch (error) {
    return res.status(500).json({ message: "Server error while creating post" });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({ posts });
  } catch (error) {
    return res.status(500).json({ message: "Server error while fetching posts" });
  }
};

const getPostById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid post id" });
    }

    const post = await Post.findById(id).populate("author", "name email");
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    return res.status(200).json({ post });
  } catch (error) {
    return res.status(500).json({ message: "Server error while fetching post" });
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid post id" });
    }

    if (!title && !content) {
      return res.status(400).json({ message: "Provide title or content to update" });
    }

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Only the original author can update this post.
    if (post.author.toString() !== req.user.id) {
      return res.status(401).json({ message: "Unauthorized to update this post" });
    }

    if (title) post.title = title;
    if (content) post.content = content;

    const updatedPost = await post.save();
    const populatedPost = await updatedPost.populate("author", "name email");

    return res.status(200).json({ message: "Post updated successfully", post: populatedPost });
  } catch (error) {
    return res.status(500).json({ message: "Server error while updating post" });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid post id" });
    }

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Only the author can delete this post.
    if (post.author.toString() !== req.user.id) {
      return res.status(401).json({ message: "Unauthorized to delete this post" });
    }

    await post.deleteOne();
    return res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error while deleting post" });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};
