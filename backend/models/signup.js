module.exports = (sequelize, DataTypes) => {
    const signup = sequelize.define("signup", {
        phone: {
            type: DataTypes.STRING,
        },
        otp: {
            type: DataTypes.STRING
        }
    }, {
        // timestamps: false
        // createdAt: false
    });

    return signup;
}


