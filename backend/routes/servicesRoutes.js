import express from 'express';
import {
  getServices,
  createService,
  updateService,
  deleteService,
} from '../controllers/servicesController.js';

const router = express.Router();

// GET /api/services
router.get('/', getServices);

// POST /api/services
router.post('/', createService);

// PUT /api/services/:id
router.put('/:id', updateService);

// DELETE /api/services/:id
router.delete('/:id', deleteService);

export default router;