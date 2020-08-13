const mysql = require('mysql');
const Sequelize = require('sequelize');

const config = {
    host: 'localhost',
    user: 'root',
    password: '534442',
    database: 'sudoku',
};

const db = mysql.createConnection(config);

db.connect(err => {
    if (err) throw err
        console.log('MySQL connect!!!')
})

const sequelize = new Sequelize('sudoku','root','534442',{
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = {sequelize, db, Sequelize};