import express from 'express';
import {
  getAllEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from '../controllers/eventsController.js';

const router = express.Router();

// GET /api/events
router.get('/', getAllEvents);

// POST /api/events
router.post('/', createEvent);

// PUT /api/events/:id
router.put('/:id', updateEvent);

// DELETE /api/events/:id
router.delete('/:id', deleteEvent);

export default router;