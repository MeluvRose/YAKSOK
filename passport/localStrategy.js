const LocalStrategy=require('passport-local').Strategy;
const {User} = require('../models');

module.exports=(passport)=>{
    passport.use(new LocalStrategy({
        usernameField:'email',
        passwordField:'password'
    },async(email,password,done)=>{
        try{
            const user = await User.findOne({where:{email}});
            if(user){
                if(user.password===password){
                    done(null,user);
                }else{
                    done(null,false,{message:'비밀번호 틀림'});
                }
            }else{
                done(null,false,{message:'ID없3 필요'});
            }
        }catch(error){
            console.error(error);
            done(error);
        }
    }));
};