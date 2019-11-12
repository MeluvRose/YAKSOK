module.exports=(sequelize,DataTypes)=>{
    return sequelize.define('user',{
        email:{
            type:DataTypes.STRING(100),
            allowNull:false,
            unique:true
        },
        password:{
            type:DataTypes.STRING(100),
            allowNull:false,
        },
        profile_img:{
            type:DataTypes.STRING(100),
        }
    });
}