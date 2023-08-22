import express from 'express';
import {
  getAllHeroes,
  createHero,
  updateHero,
  deleteHero,
} from '../controllers/heroController.js';

const router = express.Router();

// Get all heroes
router.get('/', getAllHeroes);

// Create a new hero
router.post('/', createHero);

// Update a hero
router.put('/:id', updateHero);

// Delete a hero
router.delete('/:id', deleteHero);

export default router;