const jwt = require('jsonwebtoken');

const rootPath = ('../');
const config = require(rootPath + 'config');

const tokenName = config.tokenName;
const jwtSecret = config.jwtSecret;

module.exports = function(req, res, next) {
    const accessToken = req.headers[tokenName] || false;
    if (!accessToken){
        //throw error
    }

    try{
        req.payload = jwt.verify(accessToken, Buffer.from(jwtSecret, 'base64'),{
            algorithm: ["HS256"]
        });
        next();
    } catch (error) {
        res.status(403).send({
            message: 'Invalid user authentication.',
            error: error
        })
    }

};