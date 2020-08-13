const router = require('./router/rout');
const {sequelize} = require('./DbConnection/connection');

sequelize.authenticate()
    .then(() => {
        sequelize.sync()
    })
    .then(() => console.log('Authenticate success'))
    .catch((err) => console.log(err));
