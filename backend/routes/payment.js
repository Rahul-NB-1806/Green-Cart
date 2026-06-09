import { Router } from 'express';
import getRazorpay from '../config/razorpay.js';
import { protect } from '../middleware/auth.js';
import Order from '../models/Order.js';

const router = Router();

router.use(protect);

// @desc    Create Razorpay order
// @route   POST /api/payment/create-order
router.post('/create-order', async (req, res) => {
  const { orderId } = req.body;

  const order = await Order.findById(orderId);
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  const razorpay = getRazorpay();
  const options = {
    amount: order.totalAmount * 100,
    currency: 'INR',
    receipt: orderId,
  };

  try {
    const razorpayOrder = await razorpay.orders.create(options);
    res.json({
      id: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
    });
  } catch (error) {
    res.status(500).json({ message: 'Payment creation failed' });
  }
});

// @desc    Verify payment
// @route   POST /api/payment/verify
router.post('/verify', async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

  const crypto = await import('crypto');
  const body = razorpay_order_id + '|' + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest('hex');

  if (expectedSignature === razorpay_signature) {
    await Order.findByIdAndUpdate(orderId, {
      paymentId: razorpay_payment_id,
      paymentStatus: 'paid',
    });
    res.json({ message: 'Payment verified successfully' });
  } else {
    await Order.findByIdAndUpdate(orderId, {
      paymentStatus: 'failed',
    });
    res.status(400).json({ message: 'Payment verification failed' });
  }
});

export default router;
