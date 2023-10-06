const express = require('express');
const indexController = require('../controllers/index');
const orderController = require('../controllers/order');

const router = express.Router();

router.route('/api').get(indexController.homePage);
//router.route('/api/register').get(orderController.analyzeOrder);

module.exports = router;
