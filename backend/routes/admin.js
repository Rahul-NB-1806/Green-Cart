import { Router } from 'express';
import {
  getStats,
  createPlant,
  updatePlant,
  deletePlant,
  getOrders,
  updateOrderStatus,
  getUsers,
} from '../controllers/adminController.js';
import { protect, admin } from '../middleware/auth.js';

const router = Router();

router.use(protect, admin);

router.get('/stats', getStats);
router.get('/orders', getOrders);
router.put('/orders/:id', updateOrderStatus);
router.get('/users', getUsers);
router.post('/plants', createPlant);
router.put('/plants/:id', updatePlant);
router.delete('/plants/:id', deletePlant);

export default router;
