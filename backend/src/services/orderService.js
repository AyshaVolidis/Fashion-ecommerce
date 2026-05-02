const Order = require('../models/Order');
const Product = require('../models/Product');

const createOrder = async (cartItems, userInfo, userId) => {
  let totalPrice = 0;
  const products = [];

  for (const item of cartItems) {
    const product = await Product.findById(item.productId);
    if (!product) throw new Error(`Product ${item.productId} not found`);
    if (product.stock < item.quantity) throw new Error(`Insufficient stock for ${product.name}`);

    const itemTotal = product.price * item.quantity;
    totalPrice += itemTotal;

    products.push({
      product: product._id,
      quantity: item.quantity,
      price: product.price
    });

    product.stock -= item.quantity;
    await product.save();
  }

  const order = new Order({ products, totalPrice, userInfo, userId, status: 'pending' });
  return await order.save();
};

const updateOrderStatus = async (orderId, status) => {
  const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
  if (!order) throw new Error('Order not found');
  return order;
};

const getUserOrders = async (userId) => {
  const orders = await Order.find({ userId }).populate('products.product');
  return orders;
};

module.exports = { createOrder, updateOrderStatus, getUserOrders };
