const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize('stayhotel', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: true,
    pool: {}
})

sequelize.authenticate()
.then(() => {
    console.log('DB connected');
}).catch((err) => {
    console.log('Error', err);
})

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;


// {force: true}
db.sequelize.sync().then(() => {
    console.log('Sync DB');
}).catch((err) => {
    console.log('ERR', err);
})



db.signup = require('./signup')(sequelize, DataTypes)
// db.msgs = require('./msg')(sequelize, DataTypes)
module.exports = db;
