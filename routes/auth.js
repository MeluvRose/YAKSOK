var express=require('express');
var router=express.Router();
router.get('/signUp',function(req,res,next){
    res.render('signUp');
});
router.get('/login',function(req,res,next){
    res.render('login');
});
router.post('/signUp',function(req,res,next){

});
router.post('/login',function(req,res,next){

});
module.exports=router;
