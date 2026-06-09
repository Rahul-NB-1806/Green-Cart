import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import Plant from '../models/Plant.js';

// @desc    Create order
// @route   POST /api/orders
export const createOrder = async (req, res) => {
  const { shippingAddress } = req.body;

  const cart = await Cart.findOne({ user: req.user._id }).populate('items.plant');
  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ message: 'Cart is empty' });
  }

  const items = cart.items.map(item => ({
    plant: item.plant._id,
    quantity: item.quantity,
    price: item.plant.price,
  }));

  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const order = await Order.create({
    user: req.user._id,
    items,
    totalAmount,
    shippingAddress,
  });

  // Decrease stock
  for (const item of cart.items) {
    await Plant.findByIdAndUpdate(item.plant._id, {
      $inc: { stock: -item.quantity },
    });
  }

  // Clear cart
  cart.items = [];
  await cart.save();

  res.status(201).json(order);
};

// @desc    Get user orders
// @route   GET /api/orders
export const getUserOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
    .populate('items.plant')
    .sort('-createdAt');
  res.json(orders);
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
export const getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id).populate('items.plant');
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }
  res.json(order);
};
