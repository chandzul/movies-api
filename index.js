// const sequelize = require('sequelize');
const express =  require('express');
const bodyParser = require('body-parser'); // Gestionar las peticiones http
const { config } = require('./config');
const filmsApi = require('./routes/films');
const uploadsApi = require('./routes/uploads');
const bucketsApi = require('./routes/buckets');

const app = express();

app.use(bodyParser.json()); // convierte todo lo que llega a JSON
app.use(bodyParser.urlencoded({ extended: true }));

filmsApi(app);
uploadsApi(app);
bucketsApi(app);

app.use(function (err, req, res, next) {
    if (err.code === 'LIMIT_FILE_SIZE') {
        console.log(err);
        res.status(200).json({ result: 'fail', error: { code: 1001, message: 'File is too big' } })
        return;
    }
    // Handle any other errors
})

// app.get('/', (req, res) => {
//     res.send('hola mundo david');
// });

app.listen(config.appPort,() => {
    console.log('localhost:3001');
});
