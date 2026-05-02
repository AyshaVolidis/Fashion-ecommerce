const { createOrder, updateOrderStatus, getUserOrders } = require('../services/orderService');
const { mockPayment } = require('../utils/payment');

const checkout = async (req, res, next) => {
  try {
    const { cartItems, userInfo } = req.body;
    const userId = req.userId;

    if (!cartItems || !userInfo) throw new Error('Missing cart items or user info');

    const order = await createOrder(cartItems, userInfo, userId);

    const paymentResult = await mockPayment(order.totalPrice);

    if (paymentResult.success) {
      await updateOrderStatus(order._id, 'paid');
      order.status = 'paid';
    } else {
      await updateOrderStatus(order._id, 'failed');
      order.status = 'failed';
    }

    res.json({ order, payment: paymentResult });
  } catch (error) {
    next(error);
  }
};

const getUserOrdersController = async (req, res, next) => {
  try {
    const userId = req.userId;
    const orders = await getUserOrders(userId);
    res.json({ success: true, orders });
  } catch (error) {
    next(error);
  }
};

module.exports = { checkout, getUserOrdersController };
