const router = require('express').Router();
const verify = require('./verify.token')

router.get('', verify, (req,res,next)=>{
    console.log('Попавсь');
    if (req.user)
    {      
        next();
    }
    else res.redirect('/user/login')
})




module.exports = router