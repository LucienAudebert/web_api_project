// server/index.js


const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
  });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});


/*
const productsModel = require('../models/products').productsModel;
const express = require("express");
const productController = require('../controllers/products');
const PORT = process.env.PORT || 3001;


const name_input = "Pomme";
const quantity_input = 1;
const price_input = 1;
productController.storeProduct;

const app = express();

app.get("/api", (req, res) => {
  productsModel.find({}).then((products) => {
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
  });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
*/
