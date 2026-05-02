const express = require('express');
const router = express.Router();
const { getProducts, getProduct, addProduct, editProduct, removeProduct } = require('../controllers/productController');
const { validateProduct } = require('../middleware/validationMiddleware');

router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/', validateProduct, addProduct);
router.put('/:id', validateProduct, editProduct);
router.delete('/:id', removeProduct);

module.exports = router;
