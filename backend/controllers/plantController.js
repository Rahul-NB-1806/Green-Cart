import Plant from '../models/Plant.js';

// @desc    Get all plants (with search/filter)
// @route   GET /api/plants
export const getPlants = async (req, res) => {
  const { category, search, featured, medicinal, minPrice, maxPrice } = req.query;
  const query = {};

  if (category) query.category = category;
  if (featured) query.featured = featured === 'true';
  if (medicinal) query.isMedicinal = medicinal === 'true';
  if (search) query.name = { $regex: search, $options: 'i' };
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }

  const plants = await Plant.find(query);
  res.json(plants);
};

// @desc    Get single plant
// @route   GET /api/plants/:id
export const getPlantById = async (req, res) => {
  const plant = await Plant.findById(req.params.id);
  if (plant) {
    res.json(plant);
  } else {
    res.status(404).json({ message: 'Plant not found' });
  }
};

// @desc    Get featured plants
// @route   GET /api/plants/featured
export const getFeaturedPlants = async (req, res) => {
  const plants = await Plant.find({ featured: true }).limit(8);
  res.json(plants);
};

// @desc    Get medicinal plants
// @route   GET /api/plants/medicinal
export const getMedicinalPlants = async (req, res) => {
  const plants = await Plant.find({ isMedicinal: true });
  res.json(plants);
};
