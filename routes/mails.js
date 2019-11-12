let nodemailer = require('nodemailer');
let express=require('express');
let router = express.Router();
const {isLoggedIn} = require('./middlewares');
const {User,Contract} =require('../models');
let transporter;
function card_maker(index,title,content){
    let card = new Array();
    card[0]=`<!DOCTYPE html>
    <html>
    <body>
      <header>
      <link href="https://fonts.googleapis.com/css?family=Nanum+Pen+Script&display=swap" rel="stylesheet">
      <link rel="stylesheet" href="localhost:3000/stylesheets/dogs.css">
      </header>
    </body>
    <div class="dog-bgSizeCover">
        <div><textarea class="dogfullpw font-dogtsizepw dogtitlepw dogfontpw" inputmode="tel">${title}</textarea></div>
        <div><textarea class="dogfullpw font-dogcsizepw dogcomentpw dogfontpw">${content}</textarea></div>
    </div>
    
    </html>
    `;
    card[1]=`<!DOCTYPE html>
    <html>
    <header>
    <link href="https://fonts.googleapis.com/css?family=Nanum+Pen+Script&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="localhost:3000/stylesheets/pumkin.css">
    </header>
    <body>
        <div class="pu-bgSizeCover">
            <div><textarea class="fullpw font-pumtsizepw pumtitlepw pumfontpw" inputmode="tel">${title}</textarea></div>
            <div><textarea class="fullpw font-pumcsizepw pumcomentpw pumfontpw">${content}</textarea></div>
        </div>
    </body>
    
    </html>
    `;
    card[2]=`<!DOCTYPE html>
    <html>
    <header>
    <link href="https://fonts.googleapis.com/css?family=Nanum+Pen+Script&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="localhost:3000/stylesheets/snow.css">
    </header>
    <body>
    
    </body>
    <div class="sn-bgSizeCover">
        <div><textarea class="fullsnowpw snfontpw sntitlepw font-sntsizepw" inputmode="tel">${title}</textarea></div>
        <div><textarea class="fullsnowpw sncomentpw snfontpw font-sncsizepw ">${content}</textarea></div>
    </div>
    
    </html>
    `;

    return card[index];
}

router.post('/',isLoggedIn,async (req,res,next)=>{
    let title = req.body.title;
    let content = req.body.content;
    let email = req.body.sended_email;
    let sender_email=req.user.email;
    let ether_id = req.body.ether_id && 'none';
    let card_number = req.body.card_number;
    console.log('=========mailPostRouter');
    console.log(title);
    console.log(content);
    console.log(email);
    console.log(sender_email);
    console.log(ether_id)
    console.log(card_number);
    console.log('=======================');

    // 1 is ready, 2 is confirm, 3 is completed
    try{
        // if(ether_id===''){
        //     return res.status(400).json({message:'메타마스크 아이디 필수'});
        // } 

        //from , to

        let from = await User.findOne({
            where:{
                email:sender_email,
            }
        });

        let to = await User.findOne({
            where:{
                email:email,
            },
        });

        let contract=await Contract.create({
            title:title,
            content:content,
            status:1,
            ether_id:ether_id,
            from:from.id,
            to:to.id,
            card_number:card_number,
        });
        console.log(contract.id);
        if(transporter===undefined){
            console.log('make transporter');
            transporter=nodemailer.createTransport({
                service:'gmail',
                auth:{
                    // user:process.env.user,
                    // pass:process.env.password,
                    user:process.env.user,
                    pass:process.env.password,
                }
            });
        }

        let link = `localhost:3000/mail/response/${contract.id}`;

        let html=`<h1>${title}</h1><p>from : ${sender_email}</p>
        <p> to : ${email}</p><div>${content}</div><hr><div>
        Contract Information => Contract ID : ${contract.id} </div>
        <div> <a href='${link}'>Confirm</a> </div>`;
        console.log(process.env.user);
        console.log(process.env.password);
        let mailOptions={
            from:process.env.user,
            to:email,
            subject:from.email+'님으로부터 약속이 도착했습니다.',
            html,
        };

        transporter.sendMail(mailOptions,function(error,info){
            if(error){
                console.error(error);
                res.status(500).json({message:'이메일 보내는데 에러가 났어요!'});
            }else{
                console.log('good to go!');
            }
        });


    }catch(error){
        console.error(error);
        res.status(500).json({message:'something goes wrong!'});
    }

    res.status(200).json({message:'OK'});
});

router.get('/response/:AES',async (req,res,next)=>{
    let id = req.params.AES;
    try{
        await Contract.update({
            status:2,
        },{
            where:{
                id:id,
            }
        });
        let contract = await Contract.findOne({
            where:{
                id:id,
            }
        });
        console.log('excellent!');
        console.log(contract.id);
        let rendering;
        if(contract.card_number==='0'){
            rendering='dog';
        }else if(contract.card_number==='1'){
            rendering='pumkin';
        }else{
            rendering='snow';
        }
        return res.render(rendering,{title:contract.title,content:contract.content});
    }catch(error){
        console.error(error);
        next(error);
    }
    return res.render('mailConfirm');
});
module.exports=router;