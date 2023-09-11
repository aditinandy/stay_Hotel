module.exports = (sequelize, DataTypes) => {
    const signup = sequelize.define("signup", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        phone: {
            type: DataTypes.STRING,
        },
        otp: {
            type: DataTypes.STRING
        },
        userType: {
            type: DataTypes.STRING,
            // defaultValue: 'Customer'
        }
    }, {
        // timestamps: false
        // createdAt: false
    });

    return signup;
}


