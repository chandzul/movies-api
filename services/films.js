const { Film } = require('../lib/mysql');

class FilmsSevice {
    constructor() {
        this.collection = 'films';
    }

    async getFilms() {
        const films = await Film.findAll();
        return films || [];
    }

    async createFilm(data) {
        const film = await  Film.create(data);
        return film || [];
    }

    async updateFilm(film, id) {
        const filmUpdated = await Film.update(film, {
            where: {
                id: id
            }
        }).then(async (res) => {
            const new_film = await Film.findByPk(id);
            return new_film;
        });
        return filmUpdated;
    }

    async deleteFilm(id) {
        const filmDeleted = await Film.destroy({
            where: {
                id: id
            }
        });
        return filmDeleted;
    }
}

module.exports = FilmsSevice;
