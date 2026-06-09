import { Router } from 'express';
import { getPlants, getPlantById, getFeaturedPlants, getMedicinalPlants } from '../controllers/plantController.js';

const router = Router();

router.get('/featured', getFeaturedPlants);
router.get('/medicinal', getMedicinalPlants);
router.get('/', getPlants);
router.get('/:id', getPlantById);

export default router;
