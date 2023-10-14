const axios = require('axios');
const productModel = require('../models/products').productModel;

const getAllProducts = (req, res, next) => {
    productModel
        .find({})
        .then((allProducts) => {
            res.json(allProducts);
        })
        .catch((error) => {
            // transmit the error to the next middleware
            return next(error);
        });
};

const checkCart = (req, res, next) => {
    let cart = req.body.cart;
    let email = req.body.email;

    if (isQuantityAvailable(cart)) {
        updateQuantity(cart);

        // Send information to order controller via route to store the order
        axios
            .post('http://127.0.0.1:3000/api/valid', {
                email: email,
                cart: cart
            })
            .then((postRes) => {
                res.json(postRes.data);
            })
            .catch((err) => {
                console.error(err);
            });
    } else {
        res.status(400).json(
            'Sorry, your order is invalid. Some products that you ordered are not available at the moment.'
        );
    }
};

async function isQuantityAvailable(cart) {
    let isValid = true;
    for (let key of Object.keys(cart)) {
        try {
            quantityInStock = await productModel.findOne({ name: cart[key].name }, 'quantity');

            if (quantityInStock < cart[key].quantity) {
                isValid = false;
                break;
            }
        } catch (err) {
            next(err);
        }
    }
    return isValid;
}

async function updateQuantity(cart) {
    for (let key of Object.keys(cart)) {
        try {
            productInStock = await productModel.findOne({ name: cart[key].name });
            updatedQuantity = productInStock.quantity - cart[key].quantity;
        } catch (err) {
            next(err);
        }

        try {
            const result = await productModel.updateOne(
                { name: cart[key].name },
                { $set: { quantity: updatedQuantity } }
            );
        } catch (err) {
            next(err);
        }
    }
}

module.exports = { checkCart, getAllProducts };
