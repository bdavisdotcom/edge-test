const user = require('../services/user.js');

module.exports = (req, res, next) => {
    console.log("*** Auth token checker");
    console.dir(req.auth);

    if (req.auth && req.auth.id && req.auth.email) {
        user.getUserById(req.auth.id).then(user => {
            console.dir(user);
            res.locals.user = user;
            next();
        }, err => {
            next(err);
        });
    } else {
        res.locals.user = null;
        next();
    }
};