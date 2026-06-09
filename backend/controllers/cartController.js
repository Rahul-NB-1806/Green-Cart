import Cart from '../models/Cart.js';
import Plant from '../models/Plant.js';

// @desc    Get user cart
// @route   GET /api/cart
export const getCart = async (req, res) => {
  let cart = await Cart.findOne({ user: req.user._id }).populate('items.plant');
  if (!cart) {
    cart = await Cart.create({ user: req.user._id, items: [] });
  }
  res.json(cart);
};

// @desc    Add item to cart
// @route   POST /api/cart
export const addToCart = async (req, res) => {
  const { plantId, quantity = 1 } = req.body;

  const plant = await Plant.findById(plantId);
  if (!plant) {
    return res.status(404).json({ message: 'Plant not found' });
  }

  let cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    cart = await Cart.create({ user: req.user._id, items: [] });
  }

  const existingItem = cart.items.find(item => item.plant.toString() === plantId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({ plant: plantId, quantity });
  }

  await cart.save();
  cart = await Cart.findOne({ user: req.user._id }).populate('items.plant');
  res.json(cart);
};

// @desc    Update cart item quantity
// @route   PUT /api/cart/:id
export const updateCartItem = async (req, res) => {
  const { quantity } = req.body;
  let cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    return res.status(404).json({ message: 'Cart not found' });
  }

  const item = cart.items.id(req.params.id);
  if (!item) {
    return res.status(404).json({ message: 'Item not found in cart' });
  }

  item.quantity = quantity;
  await cart.save();
  cart = await Cart.findOne({ user: req.user._id }).populate('items.plant');
  res.json(cart);
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:id
export const removeCartItem = async (req, res) => {
  let cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    return res.status(404).json({ message: 'Cart not found' });
  }

  cart.items = cart.items.filter(item => item._id.toString() !== req.params.id);
  await cart.save();
  cart = await Cart.findOne({ user: req.user._id }).populate('items.plant');
  res.json(cart);
};
