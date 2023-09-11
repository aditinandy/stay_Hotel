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
db.sequelize.sync({force: true}).then(() => {
    console.log('Sync DB');
}).catch((err) => {
    console.log('ERR', err);
})



db.signup = require('./signup')(sequelize, DataTypes)
db.registerhotel = require('./register_hotels')(sequelize, DataTypes)
db.registerhotelroom = require('./hotels_room')(sequelize, DataTypes)


db.signup.hasMany(db.registerhotel, { foreignKey: 'owner_id' });
db.registerhotel.belongsTo(db.signup, { foreignKey: 'owner_id' });

db.registerhotel.hasMany(db.registerhotelroom, { foreignKey: 'hotel_id' });
db.registerhotelroom.belongsTo(db.registerhotel, { foreignKey: 'hotel_id' });

db.signup.hasMany(db.registerhotelroom, { foreignKey: 'owner_id' });
db.registerhotelroom.belongsTo(db.signup, { foreignKey: 'owner_id' });


module.exports = db;
