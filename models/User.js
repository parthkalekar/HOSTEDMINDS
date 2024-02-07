const {DataTypes} = require('sequelize');
const sequelize = require('./dbConfig')
const User = sequelize.define("User",{
    firstname:{
        type: DataTypes.STRING,
        allowNull: false
    },
    middlename:{
        type:DataTypes.STRING,
        allowNull: false
    },
    lastname:{
        type: DataTypes.STRING,
        allowNull: false
    },
    rollno:{
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    address:{
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "NA"
    },
    username:{
        type:DataTypes.STRING,
        allowNull:false,
        unique: true
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    }
});

module.exports = User;