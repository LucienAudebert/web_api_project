const mongoose = require('mongoose');
const orderModel = require('../models/orders').orderModel;

const storeOrder = (email, cart) => {
    
    orderModel.create({
        _id: new mongoose.Types.ObjectId(),
        email: email,
        cart: cart
    })
    .then((order) => {
         // Order has been created
         console.log('POST created new Order: ' + order);
    })
    .catch((err) => {
        return next(err);
    })
}
    
module.exports = { storeOrder };
