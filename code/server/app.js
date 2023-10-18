// read in server's .env vars
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const OpenApiValidator = require("express-openapi-validator");
const routes = require('./routes.js');
const app = express();

const { SERVER_HOSTNAME: host, SERVER_PORT: port, SERVER_VERSION: version } = process.env;

console.log("**** Server starting up ****");

// Use json body-parser
app.use(bodyParser.json());

// Use OpenApi validation scheme / middleware
app.use(
    OpenApiValidator.middleware({
        apiSpec: './open-api-validator.yaml',
        validateRequests: true,
        validateResponses: false
    })
)

// Wire up our router
app.use(routes);

// Error handler
app.use((err, req, res, next) => {
    console.log("*** ERROR HANDLER ***");
    switch(err.status) {
        case 400:
        case 415:
            res.status(400).json({
                message: err.message,
                errors: err.errors
            })
            break;
        case 404:
            res.status(err.status).json({ message: "UNKNOWN ROUTE" });
            break;
        case 401:
            res.status(err.status).json({ message: "UNAUTHORIZED" });
            break;
        default:
            console.dir(err);
            res.status(500).json({ message: "SYSTEM ERROR" });
    }
});

const server = app.listen(port, host, () => {
    console.log(`Server version ${version} running at http://${host}:${port}/`);
});
