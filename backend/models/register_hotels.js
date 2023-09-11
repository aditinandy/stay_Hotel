const Signup = require('./signup'); 

module.exports = (sequelize, DataTypes) => {
    const registerhotel = sequelize.define("registerhotel", {
        hotel_name: {
            type: DataTypes.STRING
        },
        hotel_email: {
            type: DataTypes.STRING,
        },
        hotel_no: {
            type: DataTypes.STRING,
        },
        hotel_add: {
            type: DataTypes.STRING,
        },
        services: {
            type: DataTypes.STRING,
        },
        security: {
            type: DataTypes.STRING,
        },
        hotel_img: {
            type: DataTypes.STRING,
        },
        phone: {
            type: DataTypes.STRING,
        }
    }, {
        // timestamps: false
        // createdAt: false
    });

    return registerhotel;
}


