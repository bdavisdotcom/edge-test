module.exports = {
    get: (req, res, next) => {
        next('GET PROFILE');
    }, 
    update: (req, res, next) => {
        next('UPDATE PROFILE');
    }
}