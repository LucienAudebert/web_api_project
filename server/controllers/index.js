// server/index.js
const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require("../models/db")
const productModel = require('../models/products').productModel;
const userModel = require('../models/users').userModel;

const PORT = process.env.PORT || 3001;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get("/api", (req, res) => {

  productModel
    .find({})
    .then((products) => {
      res.json(products);
    });
});


app.post("/api/register", (req, res) => {
  console.log(req.body.user.name);
  console.log(req.body.cart);
  (
    userModel.create({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.user.name,
      email: req.body.user.email,
      address: req.body.user.address
    } )

  ).then((user) => {
    // user has been created
    console.log('POST created new user: ' + user);
  }).then(()=>{ // retrieve cart content
    console.log('POST new cart: ' + JSON.stringify(req.body.cart));
    isValidCart(req.body.cart);
  })
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});


async function isValidCart(cart){
  // Check quantity of products in database
  let isValid = true;
  for(var key of Object.keys(cart)){
    quantityInStock = await productModel.find({name: cart[key].name}, 'quantity');

    if(quantityInStock<cart[key].quantity){
      isValid = false;
      break;
    }
  }
  console.log(isValid);
  
  //if not valid -> notify user

  //if valid
  if(isValid){
    let updatedQuantity = 0;
     ////update products
     for(var key of Object.keys(cart)){
      quantityInStock = await productModel.findOne({name: cart[key].name});
      updatedQuantity = await quantityInStock.quantity-cart[key].quantity;
      updateQuantity(cart[key].name,updatedQuantity);
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

