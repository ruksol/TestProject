import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const commentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
});

const Comment = model('Comment', commentSchema);

export default Comment;