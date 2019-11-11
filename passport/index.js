const local = require('./localStrategy');
const {User} = require('../models');

module.exports = (passport)=>{
    passport.serializeUser((user,done)=>{
        done(null,user.id);
    });

    passport.deserializeUser(async (id,done)=>{
        try{
            var user=await User.findOne({where:{id}});
            done(null,user);
        }catch(error){
            done(error);
        }
    });
    local(passport);
};