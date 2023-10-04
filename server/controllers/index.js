// server/index.js


const express = require("express");
require("../models/db")
const productModel = require('../models/products').productModel;

const PORT = process.env.PORT || 3001;

const app = express();

app.get("/api", (req, res) => {
  productModel
    .find({})
    .then((products) => {
      res.json(products);
        });
  });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

