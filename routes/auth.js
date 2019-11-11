var express=require('express');
var router=express.Router();
const passport=require('passport');
const {isLoggedIn,isNotLoggedIn} = require('./middlewares');
const {User} = require('../models');
const multer=require('multer');
const path = require('path');
const fs = require('fs');

fs.readdir('img',(error)=>{
    if(error){
        fs.mkdirSync('img');
    }
});

const upload=multer({
    storage:multer.diskStorage({
        destination(req,file,cb){
            cb(null,'img/');
        },
        filename:function(req,file,cb){
            const ext = path.extname(file.originalname);
            req.file_full_name=path.basename(file.originalname,ext)+new Date().valueOf+ext;
            console.log('filename');
            cb(null,path.basename(file.originalname,ext)+new Date().valueOf+ext);
        },
    })
});

router.get('/signUp',function(req,res,next){
    res.render('signUp');
});
router.get('/login',function(req,res,next){
    res.render('login');
});

router.post('/signUp',isNotLoggedIn,upload.single('file'),async function(req,res,next){
    console.log(req.file);
    console.log(req.file_full_name);
    console.log(req.body);
    const user = await User.findOne({
        where:{
            email:req.body.email,
        }
    });

    if(user){
        console.error('이미 회원가입 되어있음');
        return res.redirect('/');
    }

    await User.create({
        email:req.body.email,
        password:req.body.password,
    });

    if(req.file){
        await User.update({
            profile_img:req.file_full_name,
        },{
            where:{email:req.body.email}
        });
    };

    console.log('회원가입 완료');
    res.redirect('/');
});

router.post('/login',isNotLoggedIn,function(req,res,next){
    passport.authenticate('local',(authError,user,info)=>{
        if(authError){
            console.error(authError);
            return res.redirect('/');
        }

        if(!user){
            console.error(info.message);
            return res.redirect('/');
        }
        console.log('로그인 완료');
        return req.login(user,(loginError)=>{
            if(loginError){
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect('/');
        });
    })(req,res,next);
});

router.get('/logout',isLoggedIn,function(req,res,next){
    req.logout();
    req.session.destroy();
    res.redirect('/');
});
module.exports=router;
