const user = require('../services/user.js');

module.exports = {
    get: (req, res, next) => {
        try {            
            res.json({ status: "OK", user: res.locals.user });
        } catch(exc) {
            next(exc);
        }
    }, 
    update: (req, res, next) => {
        try {
            const currentUser = res.locals.user;
            const { name, email, profile_image } = req.body;

            user.updateUser(currentUser.id, { name, email, profile_image }).then(updatedUser => {
                res.json({ status: "OK", user: updatedUser });
            }, err => {
                next(err);
            });
            
        } catch(exc) {
            next(exc);
        }
    }
}