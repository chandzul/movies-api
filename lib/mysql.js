const { Sequelize } = require('sequelize');
const { config } = require('../config/index');
const FilmModel = require('../models/films');
const UploadModel = require('../models/uploads');

const sequelize = new Sequelize(
    config.dbName,
    config.dbUser,
    config.dbPassword,
    {
        port: config.dbPort,
        host: config.dbHost,
        dialect: config.dbDialect
    });

const Film = FilmModel(sequelize, Sequelize);
const Upload = UploadModel(sequelize, Sequelize);

// sequelize.sync({ force: false })
//     .then(() => {
//         console.log('Tablas sincronizada')
//     });

module.exports = {
    Film,
    Upload
};
