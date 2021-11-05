'use strict';
const axios = require('axios');

class Movies {
    constructor(obj) {
        this.title = obj.title;
        this.overview = obj.overview;
        this.avgVote = obj.vote_average;
        this.totVote = obj.vote_count;
        this.imageUrl = `https://image.tmdb.org/t/p/w500${obj.poster_path}`;
        this.popularity = obj.popularity;
        this.releaseDate = obj.release_date;
    }
}

const handleGetMovies = async (req, res) => {
    let city = req.query.city;
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city}&language=en-US&include_adult=false`
    try {
        const moviesShowing = await axios.get(url);
        let movies = moviesShowing.data.results.map(movie => new Movies(movie));
        if (movies) {
            res.status(200).send(movies);
        } else {
            res.status(404).send('Not found.');
        }
    } catch (e) {
        res.status(500).send('An error has occured.');
    }
}

module.exports = handleGetMovies;
