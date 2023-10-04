const mongoose = require('mongoose');
const productModel = require('../models/products').productModel;

const indexProduct = (_req, res, next) => {
	// Retrieve all products from Mongo
	productModel.find({}).then((products) => {
		// respond to both HTML and JSON. JSON responses require 'Accept: application/json;' in the Request Header
		res.format({
			// JSON response will show all products in JSON format
			json: () => {
				res.json(products);
			}
		});
	}).catch((error) => {
		// transmit the error to the next middleware
		return next(error);
	});
};

const storeProduct = (name_input, quantity_input, price_input) => {
	// Get values from POST request. These can be done through forms or REST calls. These rely on the "name" attributes for forms
	const { name, quantity, price } = {name_input, quantity_input, price_input};

	// call the create function for our database
	productModel.create({
		_id: new mongoose.Types.ObjectId(),
		name: name,
		quantity: quantity,
        price: price,
	}).then((product) => {
		// product has been created
		console.log('New product created: ' + product);
	}).catch((error) => {
		// transmit a custom error to the next middleware
		console.log(error)
	});
};

const getProduct = (req, res, next) => {
	productModel.findById(req.params.id).then((product) => {
		console.log('GET Retrieved ID: ' + product._id);
		res.format({
			json: () => {
				res.json(product);
			}
		});
	}).catch((error) => {
		// transmit the error to the next middleware
		return next(error);
	});
};

const editProduct = (req, res, next) => {
	const id = req.params.id;
	// Search for the product within Mongo
	productModel.findById(id).then((product) => {
		// Return the product
		console.log('GET Retrieved ID: ' + product._id);
		res.format({
			// JSON response will return the JSON output
			json: () => {
				res.json(product);
			}
		});
	}).catch((error) => {
		// transmit a custom error to the next middleware
		return next(new Error('Error: There was a problem during editProduct: ' + error));
	});
};

const updateProduct = (req, res, next) => {
	// Get our request and form values.
	const id = req.params.id;
	const { name, quantity, price } = req.body;

	// find the document by ID
	productModel.findByIdAndUpdate(id, { name, quantity, price }).then((product) => {
		// HTML responds by going back to the page or you can be fancy and create a new view that shows a success page.
		res.format({
			// JSON responds showing the updated values
			json: () => {
				res.json(product);
			}
		});
	}).catch((error) => {
		// transmit a custom error to the next middleware
		return next(new Error("There was a problem updating the information to the database: " + error));
	});
};

const deleteProduct = (req, res, next) => {
	// Find product to delete by ID
	productModel.findById(req.params.id).then((product) => {
		if (!product) {
			return next(new Error('No product to delete with the specified Id.'));
		}
		// remove it from Mongo
		productModel.deleteOne(product).then((product) => {
			// Returning success messages saying it was deleted
			console.log('DELETE removed ID: ' + product._id);
			res.format({
				// JSON returns the item with the message that is has been deleted
				json: () => {
					res.json({
						message: 'deleted',
						item: product
					});
				}
			});
		}).catch((error) => {
			// transmit the error to the next middleware
			return next(error);
		});
	}).catch((error) => {
		// transmit the error to the next middleware
		return next(error);
	});
};

// we export a list of all our controllers
module.exports = { indexProduct, getProduct, editProduct, updateProduct, deleteProduct, storeProduct };