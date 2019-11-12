const Sequelize=require('Sequelize');
const env = process.env.NODE_ENV || 'development';
const config=require('../config/config.json')[env];
const db={};

const sequelize=new Sequelize(config.database,config.username,config.password,config,);

db.sequelize=sequelize;
db.Sequelize=Sequelize;
db.User=require('./User')(sequelize,Sequelize);
db.Contract=require('./Contract')(sequelize,Sequelize);

// User와 Contract 는 1:N 관계 , 외래키의 이름은 from이고 , Contract에 있음
db.User.hasMany(db.Contract,{foreignKey:'from',sourceKey:'id'});
db.Contract.belongsTo(db.User,{foreignKey:'from',targetKey:'id'});

// User와 Contract는 1:1관계 . 외래키의 이름은 to이고 Contract에 있음
db.User.hasOne(db.Contract,{foreignKey:'to',sourceKey:'id'});
db.Contract.belongsTo(db.User,{foreignKey:'to',targetKey:'id'});


module.exports=db;