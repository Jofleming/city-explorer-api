'use strict';
const axios = require('axios');

class Forecast {
    constructor(obj) {
        this.min_temp = obj.min_temp;
        this.max_temp = obj.max_temp;
        this.description = obj.weather.description;
        this.date = obj.datetime;
    }
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

module.exports = handleGetWeather;
