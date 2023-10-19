const user = require('../services/user.js');

module.exports = (req, res, next) => {
    console.log("*** Auth token checker");
    console.dir(req.auth);

    let returnUser = null;

    if (req.auth && req.auth.id && req.auth.email) {
        const loadedUser = user.getUserById(req.auth.id);
        if (loadedUser.email === req.auth.email) {
            returnUser = loadedUser;
        }
    }

    req.locals.user = returnUser;

    next();
};