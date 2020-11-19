const express = require('express');
const FilmsService = require('../services/films');

function filmsApi(app) {
    const router = express.Router();
    app.use('/api/films', router);

    const filmsService = new FilmsService();

    router.get('/', async (req, res, next) => {
        try {
            const films = await filmsService.getFilms();

            res.status(200).json({
                status: 'succes',
                message: 'films listed',
                data: films
            });
        } catch (e) {
            next(e);
        }
    });

    router.post('/', async (req, res, next) => {
        try {
            const film = await filmsService.createFilm(req.body);

            res.status(201).json({
                status: 'success',
                message: 'film created',
                data: film
            });
        } catch (e) {
            next(e);
        }
    });

    router.put('/:filmId', async (req, res, next) => {
        const film = req.body;
        const id = req.params['filmId'];

        // console.log(film, id)

        try {
            const filmUpdated = await filmsService.updateFilm(film, id);
            res.status(200).json({
                status: 'success',
                message: 'film updated',
                data: filmUpdated
            });
        } catch (e) {
            next(e)
        }
    });

    router.delete('/:filmId', async (req, res, next) => {
        const id = req.params['filmId'];

        // console.log(film, id)

        try {
            const filmUpdated = await filmsService.deleteFilm(id);

            if (filmUpdated) {
                res.status(202).json({
                    status: 'success',
                    message: 'film deleted'
                });
            }

            res.status(422 ).json({
                status: 'Unprocessable Entity',
                message: 'film not found'
            });     
        } catch (e) {
            next(e)
        }
    });
}


module.exports = filmsApi;
