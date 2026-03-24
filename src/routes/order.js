const express = require('express');
const OrderRepository = require('../repositories/OrderRepository');
const verifyToken = require('../middleware/auth');

const router = express.Router();

// CREATE ORDER (Customer)
router.post('/', verifyToken, async (req, res) => {
  try {
    const order = await OrderRepository.create({
      userId: req.user.id,
      username: req.user.username || 'Unknown',
      items: req.body.items,
      totalAmount: req.body.totalAmount,
      status: 'pending'
    });
    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET MY ORDERS
router.get('/my', verifyToken, async (req, res) => {
  try {
    const orders = await OrderRepository.getMyOrders(req.user.id);
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ADMIN: GET ALL ORDERS
router.get('/', verifyToken, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin only' });
  try {
    const result = await OrderRepository.getAllOrders({
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 10,
      status: req.query.status
    });
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE ORDER STATUS (Admin/Owner)
router.patch('/:id/status', verifyToken, async (req, res) => {
  if (!['admin', 'owner'].includes(req.user.role)) return res.status(403).json({ message: 'Not allowed' });
  try {
    const order = await OrderRepository.updateStatus(req.params.id, req.body.status);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json({ message: 'Status updated', order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;