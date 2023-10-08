const mongoose = require('mongoose');
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
}


const validateCart = (req, res, next) => {
    try {
        if (isValidCart(req.body.cart)) {
            res.json('Cart is valid');
        } else {
            res.json('Cart is invalid');
        }
    } catch (err) {
        next(err);
    }
};

async function isValidCart(cart) {
    if (isQuantityAvailable(cart)) {
        updateQuantity(cart);
        return true;
    } else {
        //if not valid -> notify user
        return false;
    }

    ////create entry in commands

    ////create or update entry in users

    ////notify user
}

async function isQuantityAvailable(cart) {
    let isValid = true;
    for (let key of Object.keys(cart)) {
        try {
            quantityInStock = await productModel.find({ name: cart[key].name }, 'quantity');

            if (quantityInStock < cart[key].quantity) {
                isValid = false;
                break;
            }
        } catch (err) {
            console.error('Error when finding products in database: ', err);
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
            console.error('Error when finding one product in database: ', err);
        }

        try {
            const result = await productModel.updateOne(
                { name: cart[key].name },
                { $set: { quantity: updatedQuantity } }
            );
            console.log('Update successful', result);
        } catch (error) {
            console.error('Error during update :', error);
        }
    }
}

module.exports = { validateCart, getAllProducts };
