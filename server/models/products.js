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

async function createEntries() {
	await productModel.create({ id: new mongoose.Types.ObjectId(), name: "Banane", quantity: 3, price: 2 });

	await productModel.create({ id: new mongoose.Types.ObjectId(), name: "Cerise", quantity: 5, price: 8 });
}

createEntries();

module.exports = { productModel };