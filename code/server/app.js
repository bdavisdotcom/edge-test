require('dotenv').config();

const host = process.env.SERVER_HOSTNAME;
const port = process.env.SERVER_PORT;
const version = process.env.SERVER_VERSION;
const jwtSecret = process.env.JWT_SECRET;

const express = require('express');
const routes = require('./routes.js')({ jwtSecret });
const app = express();

app.locals = { host, port, version };

app.use(routes);

// Error handler
app.use((err, req, res, next) => {
    console.log("Error handler hit");
    console.dir(err);
    res.status(err.status).send("UNAUTHORIZED");
});

app.listen(port, host, () => {
    console.log(`Server version ${version} running at http://${host}:${port}/`);
});