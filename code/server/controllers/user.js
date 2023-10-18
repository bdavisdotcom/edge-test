module.exports = {
    get: (req, res, next) => {
        res.json({ status: "OK" });
    }, 
    update: (req, res, next) => {
        try {
            console.dir(req.body);
            res.json({ status: "OK" });
        } catch(exc) {
            next(exc);
        }
    }
}