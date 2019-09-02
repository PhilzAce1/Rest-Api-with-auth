const jwt = require('jsonwebtoken')


module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.spilt(" ")[1];
        const decoded = jwt.verify(token, key)
        req.userData = decoded;
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        })
    }
    next()
}