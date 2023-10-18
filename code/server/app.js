require('dotenv').config();
const express = require('express');
const routes = require('./routes.js');
const app = express();

const { SERVER_HOSTNAME: host, SERVER_PORT: port, SERVER_VERSION: version } = process.env;

console.log("**** Server starting up ****");

app.use(routes);

// Error handler
app.use((err, req, res, next) => {
    console.log("Error handler hit");
    console.dir(err);
    res.status(err.status).send("UNAUTHORIZED");
});

const server = app.listen(port, host, () => {
    console.log(`Server version ${version} running at http://${host}:${port}/`);
});
