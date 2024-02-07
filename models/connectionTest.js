const sequelize = require('./dbConfig');

const testConnection = async() =>{
    try {
        await sequelize.authenticate();
        return true;
    } catch (error) {
        return false;
    }
}

module.exports = {testConnection};