const mongoose = require('mongoose');
const orderModel = require('../models/orders').orderModel;

async function storeOrder(req, res, next) {
    try {
        const order = await orderModel.create({
            _id: new mongoose.Types.ObjectId(),
            email: req.body.email,
            cart: req.body.cart
        });

        if (order) {
            // order has been created
            // console.log('POST created new order: ' + order);
            res.status(200).json('Order is stored in database');
        } else {
            res.status(400).json('Problem storing order in database');
        }
    } catch (err) {
        next(err);
    }
}

module.exports = { storeOrder };
