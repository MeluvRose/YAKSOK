var express = require('express');
var router = express.Router();
const {User}=require('../models');
const Op=require('../models').Sequelize.Op;
const {isLoggedIn} = require('./middlewares');

router.get('/',isLoggedIn,async function (req, res, next) {
    let auth;
    if(req.isAuthenticated()){
        auth=true;
    }
    let email=req.query.email;
    console.log('==============');
    email=email+'%';
    console.log(email);
    
    try{
        const user = await User.findAll({
            where:{
                email:{
                    [Op.like]:email
                }
            },
        });
        console.log(user);
        return res.render('search',{users:user,auth:auth});

    }catch(error){
        console.error(error);
        next(error);
    }
    
    res.render('search');
});

module.exports=router;