'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

const PORT = process.env.PORT;

const weather = require('./data/weather.json');
const { request } = require('express');


app.get('/weather', handleGetWeather);
app.get('/*', (req, res) => res.status(404).send('Pathway not found'));

weatherDescription = () => {
    let desc = `Low of ${element.low_temp}, high of ${element.high_temp} with ${element.weather.description}`
    return desc;
}

const handleGetWeather = (req, res) => {
    const cityName = req.query.city;
    const lat = req.query.lat;
    const lon = req.query.lon;

    try {
        const cityToSend = weather.find( city => {
            if((city.lat === lat && city.lon === lon) || city.city_name === cityName) {
                return true
            }
            return false;
        });
        if (cityToSend) {
            const forecastData = cityToSend.data.map(city => new Forecast(city));
            res.status(200).send(forecastData)
        } else {
            res.status(404).send('City not found.')
        }
    } catch (e) {
        res.status(500).send('Server error.')
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

app.listen(PORT, () => console.log('I am a server that is listening'));