module.exports = {
    login: (req, res, next) => {
        next("LOGIN");
    },

    register: (req, res, next) => {
        next("REGISTER");
    }
}