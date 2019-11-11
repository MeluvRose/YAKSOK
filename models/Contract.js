module.exports=(sequelize,DataTypes)=>{
    return sequelize.define('contract',{
        content:{
            type:DataTypes.STRING(400),
        },
        sender:{
            type:DataTypes.STRING(400),
        }
    });
}