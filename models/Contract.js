module.exports=(sequelize,DataTypes)=>{
    return sequelize.define('contract',{
        title:{
            type:DataTypes.STRING(100),
        },
        content:{
            type:DataTypes.STRING(400),
        },
        status:{
            type:DataTypes.INTEGER,
        },
        ether_id:{
            type:DataTypes.STRING(400),
        },
        card_number:{
            type:DataTypes.INTEGER,
        }
    });
}

//