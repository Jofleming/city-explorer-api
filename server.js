'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const axios = require('axios');
app.use(cors());

const PORT = process.env.PORT;

const { request } = require('express');


app.get('/weather', handleGetWeather);
app.get('/movies', handleGetMovies);
app.get('/*', (req, res) => res.status(404).send('Pathway not found'));

weatherDescription = () => {
    let desc = `Low of ${element.low_temp}, high of ${element.high_temp} with ${element.weather.description}`
    return desc;
}

const handleGetWeather = async (req, res) => {
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${req.query.lat}&lon=${req.query.lon}&key=${process.env.WEATHER_API_KEY}`;
    try {
        let cityWeather = await axios.get(url);
        let forecastData = cityWeather.data.data.map(city => new Forecast(city.datetime, city.weather.description));
        if (cityWeather) {
            res.status(200).send(forecastData)
        } else {
            res.status(404).send('City not found.')
        }
    } catch (e) {
        res.status(500).send('Server error.')
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

class Forecast {
    constructor(obj) {
        this.min_temp = obj.min_temp;
        this.max_temp = obj.max_temp;
        this.description = obj.weather.description;
        this.date = obj.datetime;
    }
}

app.listen(PORT, () => console.log(`I am a server that is listening on port: ${PORT}`));