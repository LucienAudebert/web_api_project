const productModel = require('../models/products').productModel;

const homePage = (req, res, next) => {
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

module.exports = { homePage };
