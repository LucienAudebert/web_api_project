const mongoose = require('mongoose');
const userModel = require('../models/users').userModel;

const storeUser = async (req, res, next) => {
    const { name, email, address } = req.body.user;

    try {
        const findUser = await userModel.findOne({ email: email });

        if (findUser) {
            // The email entered by user already exists in database
            res.json('This email already exists. Please enter a new one.');
        } else {
            res.json({ message: 'OK' });
            try {
                const user = await userModel.create({
                    _id: new mongoose.Types.ObjectId(),
                    name: name,
                    email: email,
                    address: address
                });

                if (user) {
                    // user has been created
                    //console.log('POST created new user: ' + user);
                }
            } catch (err) {
                return next(err);
            }
        }
    } catch (err) {
        return next(err);
    }
};

module.exports = { storeUser };
