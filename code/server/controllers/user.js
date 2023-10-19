const user = require('../services/user.js');

module.exports = {
    get: (req, res, next) => {
        try {            
            res.json({ status: "OK", user: req.locals.user });
        } catch(exc) {
            next(exc);
        }
    }, 
    update: (req, res, next) => {
        try {
            const currentUser = req.locals.user;
            const { name, email, profile_image } = req.body;
            const updatedUser = user.updateUser(currentUser.id, { name, email, profile_image });

            res.json({ status: "OK", user: updatedUser });
        } catch(exc) {
            next(exc);
        }
    }
}