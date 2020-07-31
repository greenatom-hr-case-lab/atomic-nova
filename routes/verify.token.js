const jwt = require('jsonwebtoken');
const config = require('config');
const secret = config.get('jwtSecret');

module.exports = function (req,res, next){
    const token = req.header('auth-token');
    if(!token){
        req.user = null
        next();
    } 
    try 
    {
        const verified = jwt.verify(token, secret);
        req.user = verified;
        next();
    }
    catch(e)
    {
        console.log(e)
        res.status(400).send('Invalid token')
    }
}