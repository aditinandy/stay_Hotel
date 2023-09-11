const Signup = require('./signup'); 

module.exports = (sequelize, DataTypes) => {
    const registerhotelroom = sequelize.define("registerhotelroom", {
        services: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.STRING,
        },
        security: {
            type: DataTypes.STRING,
        },
        room_img: {
            type: DataTypes.STRING,
        }
    }, {
        // timestamps: false
        // createdAt: false
    });

    return registerhotelroom;
}


