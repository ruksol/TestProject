import express from 'express';
import { createComment, getComments } from '../controllers/commentsController.js';

const router = express.Router();

// Create a new comment
router.post('/', createComment);

// Get all comments
router.get('/', getComments);

export default router;