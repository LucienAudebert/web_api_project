// server/index.js
const express = require('express');
const bodyParser = require('body-parser');
require('./models/db');
const productModel = require('./models/products').productModel;
const userModel = require('./models/users').userModel;
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3001;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(require('./routes'));

// TODO : déplacer dans un controller et le router
app.post('/api/register', (req, res) => {
    console.log(req.body.user.name);
    console.log(req.body.cart);
    userModel
        .create({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.user.name,
            email: req.body.user.email,
            address: req.body.user.address
        })
        .then((user) => {
            // user has been created
            console.log('POST created new user: ' + user);
        })
        .then(() => {
            // retrieve cart content
            console.log('POST new cart: ' + JSON.stringify(req.body.cart));
            isValidCart(req.body.cart);
        });
});

async function isValidCart(cart) {
    // Check quantity of products in database
    let isValid = true;
    for (var key of Object.keys(cart)) {
        quantityInStock = await productModel.find({ name: cart[key].name }, 'quantity');

        if (quantityInStock < cart[key].quantity) {
            isValid = false;
            break;
        }
    }
    console.log(isValid);

    //if not valid -> notify user

    //if valid
    if (isValid) {
        let updatedQuantity = 0;
        ////update products
        for (var key of Object.keys(cart)) {
            quantityInStock = await productModel.findOne({ name: cart[key].name });
            updatedQuantity = (await quantityInStock.quantity) - cart[key].quantity;
            updateQuantity(cart[key].name, updatedQuantity);
        }
    }

    ////create entry in commands

    ////create or update entry in users

    ////notify user
}

async function updateQuantity(productName, updatedQuantity) {
    try {
        const result = await productModel.updateOne({ name: productName }, { $set: { quantity: updatedQuantity } });
        console.log('Mise à jour réussie', result);
    } catch (error) {
        console.error('Erreur lors de la mise à jour :', error);
    }
}

// simple middleware to catch all non routed pages as 404 and forward to the error middleware
app.use((req, _res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    error.message = 'The page ' + req.hostname + req.originalUrl + ' could not be found on this website.';
    next(error);
});

// Middleware to handle errors
app.use((error, req, res, next) => {
    if (!error) {
        error = new Error('Unknown error');
        error.status = 500;
    } else {
        error.status = 400;
    }
    res.status(error.status);

    error_message = {
        error: error.status,
        message: error.message,
        stacktrace: error.stack
    };

    res.json(error_message);
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
