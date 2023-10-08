const mongoose = require('mongoose');
const userModel = require('../models/users').userModel;

const storeUser = (req, res, next) => {

    const { name, email, address } = req.body.user;

    userModel
        .create({
            _id: new mongoose.Types.ObjectId(),
            name: name,
            email: email,
            address: address
        })
        .then((user) => {
            // user has been created
            console.log('POST created new user: ' + user);
            res.json(user);
        })
        .catch((error) => {
            // transmit a custom error to the next middleware
            return next(new Error('There was a problem adding the information to the database: ' + error));
        });
};

module.exports = { storeUser };
