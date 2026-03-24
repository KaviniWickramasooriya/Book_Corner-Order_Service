const Order = require('../models/Order');

class OrderRepository {
  static async create(orderData) {
    const order = new Order(orderData);
    await order.save();
    return order;
  }

  static async getMyOrders(userId) {
    return await Order.find({ userId }).sort({ createdAt: -1 });
  }

  static async getAllOrders({ page = 1, limit = 10, status }) {
    const skip = (page - 1) * limit;
    const query = status ? { status } : {};
    const [orders, total] = await Promise.all([
      Order.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Order.countDocuments(query)
    ]);
    return { orders, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }

  static async updateStatus(id, status) {
    return await Order.findByIdAndUpdate(id, { status }, { new: true });
  }

  static async findById(id) {
    return await Order.findById(id);
  }
}

module.exports = OrderRepository;