module.exports = (req, res, next) => {
    console.log("Auth token checker");
    console.dir(req.auth);
    next();
};