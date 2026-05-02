const { body, param, validationResult } = require('express-validator');

const validateProduct = [
  body('name').notEmpty().withMessage('Name is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('price').isNumeric().withMessage('Price must be a number').custom(v => v >= 0).withMessage('Price must be non-negative'),
  body('image').notEmpty().withMessage('Image is required'),
  body('stock').isNumeric().withMessage('Stock must be a number').custom(v => v >= 0).withMessage('Stock must be non-negative'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  }
];

module.exports = { validateProduct };
