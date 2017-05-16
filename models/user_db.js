module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User",
        {
            username: {
                type: DataTypes.STRING,
                allowNull: false
            },
            password: {
                type: DataTypes.STRING,
                allowNull:false
            },
            userScore: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            swappedStatus: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            }
        });
    return User;
}