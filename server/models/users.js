const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
	_id: ObjectId,
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
	},
	address: {
		type: String,
		required: false,
	}
});

const userModel = mongoose.model('User', userSchema);

module.exports = { userModel };