const {Sequelize,DataTypes } = require('sequelize');
const sequelize = require('./dbConfig');

const Room = sequelize.define("Room",{
    department:{
        type:DataTypes.STRING,
        allowNull:false
    },
    schedule:{
        type:DataTypes.STRING,
        allowNull:false
    },
    year:{
        type:DataTypes.STRING,
        allowNull:false
    },
    roomnumber:{
        type:DataTypes.INTEGER,
        allowNull:false,
        unique:true
    },
    subject:{
        type:DataTypes.STRING,
        allowNull:false,
        // unique: true
    }
});

module.exports = Room;