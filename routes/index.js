var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let auth;
  if(req.isAuthenticated()){
    auth=true;
  }
  res.render('index', { title: 'Express',auth });
});
router.get('/search',function(req,res,next){
  let auth;
  if(req.isAuthenticated()){
    auth=true;
  }
  res.render('search',{auth});
});

module.exports = router;
