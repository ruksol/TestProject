import Comment from '../models/commentsModel.js';

// Create a new comment
const createComment = async (req, res) => {
  try {
    const { name, email, comment } = req.body;
    const newComment = new Comment({ name, email, comment });
    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create comment' });
  }
};

// Get all comments
const getComments = async (req, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve comments' });
  }
};

export { createComment, getComments };