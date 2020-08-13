const {DataTypes, Model} = require('sequelize');
const {sequelize} = require('../DbConnection/connection');

class Users extends Model{}

Users.init({
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    username: {type: DataTypes.STRING, primaryKey: true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    tempGame: {type: DataTypes.STRING},
    gameId : {type: DataTypes.INTEGER}
}, {sequelize, modelName: 'users'})

module.exports = Users;