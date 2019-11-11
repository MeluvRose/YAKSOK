const Sequelize=require('Sequelize');
const env = process.env.NODE_ENV || 'development';
const config=require('../config/config.json')[env];
const db={};

const sequelize=new Sequelize(config.database,config.username,config.password,config,);

db.sequelize=sequelize;
db.Sequelize=Sequelize;
db.User=require('./User')(sequelize,Sequelize);
db.Contract=require('./Contract')(sequelize,Sequelize);

db.User.hasMany(db.Contract,{foreignKey:'from',sourceKey:'id'});
db.Comment.belongsTo(db.User,{foreignKey:'from',targetKey:'id'});

db.User.hasOne(db.Contract,{foreignKey:'to',sourceKey:'id'});
db.Comment.belongsTo(db.User,{foreignKey:'to',targetKey:'id'});


module.exports=db;