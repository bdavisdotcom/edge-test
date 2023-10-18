const userService = require('../services/user.js');

module.exports = {
    login: (req, res, next) => {
        res.json({ 'message': 'OK' })
    },

    register: (req, res, next) => {

        const body = { name, email, password, profile_image } = req.body;

        const userParams = {
            name, email, password, profile_image: profile_image ? profile_image : ''
        };

        userService.registerNewUser(userParams).then(newUser => {
            res.json({ 'message': 'OK', user: newUser })
        }, err => {
            next(err);
        });       
    }
}