const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const orderSchema = new Schema({
    _id: ObjectId,
    email: {
        type: String,
        required: true
    },
    cart: {
        type: Schema.Types.Mixed,
        default: {},
        required: true
        
    }
});

const orderModel = mongoose.model('Order', orderSchema);

module.exports = { orderModel };
