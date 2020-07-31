const router = require('express').Router();
//const serv = require('../services/auth.service')
const jwt = require('jsonwebtoken');
const config = require('config');
const roleMap = config.get('roleMap');
const secret = config.get('jwtSecret');
const User = require('../models/user');
// /api/auth/login
router.post('/login', async (req, res) => {
    try{
        const {login, password} = req.body
        const user = await User.findOne({username: login})
        if (!user) res.status(500).json({message:"No user found"})
        user.cmpPassword(password, user.hashStr, (e, isMatched) =>{
            if (e) {
                console.log(e)
                res.status(500).json({message:"Something went wrong. Try again"})

            }
            else if (!isMatched) res.status(500).json({message:"Auth error"})
            //Create and assign a web token roleMap[user.role]
            const token = jwt.sign({_id:user._id ,_role:roleMap[user.role]}, 
                secret, { expiresIn: '256h' });
            res.header('auth-token', token).json({message:"Welcome"});
            //res.status(200).json({message:"Welcome"})
        });
    }catch(e){
        console.log(e)
        res.status(500).json({message:"Something went wrong. Try again"})
    }
})
router.get('/login', async (req, res) => {
    res.render('auth-page')
})
module.exports = router