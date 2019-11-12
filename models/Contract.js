module.exports=(sequelize,DataTypes)=>{
    return sequelize.define('contract',{
        title:{
            type:DataTypes.STRING(100),
        },
        content:{
            type:DataTypes.STRING(400),
        },
        sender:{
            type:DataTypes.STRING(400),
        }
    });
}