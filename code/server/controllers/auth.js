const userService = require('../services/user.js');

module.exports = {
    login: (req, res, next) => {
        const { email, password } = req.body;

        userService.login({ email, password })
            .then(user => {
                if (!user) {
                    res.status(401).json({ 'message': 'Invalid Login', user: null });
                } else {
                    res.json({ 'message': 'OK', user })
                }
            }, err => {
                next(err);
            });
    },

    register: (req, res, next) => {
        const { name, email, password, profile_image = '' } = req.body;

        userService.registerNewUser({ name, email, password, profile_image })
            .then(user => {  
                if (!user) {
                    res.status(409).json({ 'message': 'User already exists', user: null })
                } else {
                    res.json({ 'message': 'OK', user })
                }                
            }, err => {
                next(err);
            });        
    }
}