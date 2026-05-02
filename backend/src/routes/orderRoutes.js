const express = require('express');
const router = express.Router();
const { checkout, getUserOrdersController } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

router.post('/checkout', protect, checkout);
router.get('/my-orders', protect, getUserOrdersController);

module.exports = router;
