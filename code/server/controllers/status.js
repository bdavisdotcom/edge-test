module.exports = (req, res) => {
    res.json({
        status: 'OK',
        serverTime: new Date(),
        serverVersion: process.env.SERVER_VERSION,
        message: 'HULLO'
    });
}