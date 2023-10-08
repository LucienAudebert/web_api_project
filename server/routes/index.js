const express = require('express');
const productController = require('../controllers/products');
const userController = require('../controllers/users');

const router = express.Router();

router.route('/api').post(userController.storeUser);
router.route('/api/products').get(productController.getAllProducts);
router.route('/api/order').post(productController.validateCart);

module.exports = router;
