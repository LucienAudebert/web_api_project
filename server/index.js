// server/index.js
const express = require('express');
const bodyParser = require('body-parser');
require('./models/db'); // connexion to database
const PORT = process.env.PORT || 3001;
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(require('./routes'));

// simple middleware to catch all non routed pages as 404 and forward to the error middleware
app.use((req, res, next) => {
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

    err = {
        status: error.status,
        message: error.message,
        stacktrace: error.stack
    };

    console.error("Error: Status: ", err.status, "  |  Message: ", err.message, "  |  StackTrace: ", err.stacktrace);
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
