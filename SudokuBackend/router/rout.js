const express = require('express');
const rout = express();
const cors = require('cors');
const {db, Sequelize} = require('../DbConnection/connection');
const SudokuArray = require('../Models/sudokuArray');
const Users = require('../Models/Users');
const getGrids = require('../percentController/PercentController');
const getDigits = require('../generateNumbers/generateSudokuNumbers');

rout.use(cors());
rout.use(express.json());

rout.get('/', (req,res) => {
    let sql = 'SELECT * FROM sudoku.sudokus';
    db.query(sql,(err,result) => {
        if(err) throw err;
        res.status(200).json(result)
    })
});

rout.post('/generateSudokuDigits', (req,res) => {
    for (let i = 0; i < +req.body.count; i++) {
        SudokuArray.create({
            sudokuNumbers: JSON.stringify(getDigits())
        })
    }
    res.status(200).json(`${req.body.count} digits generated successfully`);
})

rout.get('/getPuzzleDigit/:userId/:index', (req, res) => {
    Users.findOne({
        where: {
            id: req.params.userId
        }
    })
        .then(data => {
            SudokuArray.findOne({
                where : {
                    id : data.gameId
                }
            })
                .then(arr => JSON.parse(arr.sudokuNumbers))
                .then(sudoku => {
                    const hint = sudoku[req.params.index];
                    res.status(200).json(hint)
                })
        })
})

rout.get('/getUserGrid/:id/:difficulty/', (req,res) => {
            SudokuArray.findOne({
                order: [
                    Sequelize.fn( 'RAND')
                ] })
                .then(game => {
                    const userGrid = getGrids(JSON.parse(game.sudokuNumbers), req.params.difficulty);
                    Users.update({
                        gameId: game.id,
                        initialGame: JSON.stringify(userGrid),
                    }, {
                        where : {
                            id: req.params.id
                        },
                    });
                    res.status(200).json(userGrid);
                })
                .catch(err => console.log(err))
})

rout.get('/getSavedGame/:id', (req, res) => {
    Users.findOne({
        where : {
            id: req.params.id
        }
    })
        .then(data => {
            if (!data.tempGame) {
                res.redirect(`/getUserGrid/${req.params.id}/easy/`);
            }
            console.log('DATA',data);
            res.status(200).send({tempGame:JSON.parse(data.tempGame), initialGame: JSON.parse(data.initialGame)});
        })
})



rout.put('/saveGame', (req,res) => {
    Users.update({
        tempGame: JSON.stringify(req.body.tempGame),
        initialGame: JSON.stringify(req.body.initialGame)
    },{
        where : {
            id: +req.body.id
        }
    })
        .then(data => res.status(200).json(data))
        .catch(err => res.status(200).json(err))
})


rout.listen(3000, () => {
    console.log('Server has been started on port 3000/...')
});

module.exports = rout;