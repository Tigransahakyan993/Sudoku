const {DataTypes, Model} = require('sequelize');
const {sequelize} = require('../DbConnection/connection');

class SudokuArray extends Model {}

SudokuArray.init({
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    sudokuNumbers: {
        type: DataTypes.STRING
    }
}, {sequelize, modelName: 'sudoku'});

module.exports = SudokuArray;

