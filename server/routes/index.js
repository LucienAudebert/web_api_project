const express = require('express');
const productController = require('../controllers/products');
const userController = require('../controllers/users');
const orderController = require('../controllers/orders');

const router = express.Router();

router.route('/api').post(userController.storeUser);
router.route('/api/products').get(productController.getAllProducts);
router.route('/api/order').post(productController.checkCart);
router.route('/api/valid').post(orderController.storeOrder);

module.exports = router;
