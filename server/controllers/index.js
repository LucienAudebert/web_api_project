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
  console.log(req.body);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});