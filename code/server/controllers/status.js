module.exports = (req, res) => {
    res.json({
        status: 'OK',
        serverTime: new Date(),
        serverVersion: req.app.locals.version,
        message: 'HULLO'
    });
}