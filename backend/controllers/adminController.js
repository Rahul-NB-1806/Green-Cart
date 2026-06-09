import Plant from '../models/Plant.js';
import Order from '../models/Order.js';
import User from '../models/User.js';

export const getStats = async (req, res) => {
  const totalPlants = await Plant.countDocuments();
  const totalOrders = await Order.countDocuments();
  const totalUsers = await User.countDocuments();
  const revenueResult = await Order.aggregate([
    { $match: { paymentStatus: 'paid' } },
    { $group: { _id: null, total: { $sum: '$totalAmount' } } },
  ]);
  const totalRevenue = revenueResult[0]?.total || 0;

  res.json({ totalPlants, totalOrders, totalUsers, totalRevenue });
};

export const createPlant = async (req, res) => {
  const plant = await Plant.create(req.body);
  res.status(201).json(plant);
};

export const updatePlant = async (req, res) => {
  const plant = await Plant.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!plant) {
    return res.status(404).json({ message: 'Plant not found' });
  }
  res.json(plant);
};

export const deletePlant = async (req, res) => {
  const plant = await Plant.findByIdAndDelete(req.params.id);
  if (!plant) {
    return res.status(404).json({ message: 'Plant not found' });
  }
  res.json({ message: 'Plant removed' });
};

export const getOrders = async (req, res) => {
  const { status } = req.query;
  const query = {};
  if (status) query.orderStatus = status;
  const orders = await Order.find(query)
    .populate('user', 'name email')
    .populate('items.plant')
    .sort('-createdAt');
  res.json(orders);
};

export const updateOrderStatus = async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { orderStatus: req.body.status },
    { new: true }
  );
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }
  res.json(order);
};

export const getUsers = async (req, res) => {
  const users = await User.find({}).select('-password');
  res.json(users);
};
