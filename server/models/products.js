const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const productSchema = new Schema({
	_id: ObjectId,
	name: {
		type: String,
		required: true
	},
	quantity: {
		type: Number,
		required: true,
	},
    price: {
		type: Number,
		required: true,
	}
});

const productModel = mongoose.model('Product', productSchema);
module.exports = { productModel };