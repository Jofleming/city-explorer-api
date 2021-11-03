'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

const PORT = process.env.PORT;

const weatherData = require('./data/weather.json');
const { request } = require('express');


app.get('/temp', (request, response) => { response.send('This is a placeholder string') });
app.get('/weather', handleGetWeather);

weatherDescription = () => {
    let desc = `Low of ${element.low_temp}, high of ${element.high_temp} with ${element.weather.description}`
    return desc;
}

const handleGetWeather = (req, res) => {
    const data = weatherData.find(element => element.city_name == request.query.city_name && element.lon == request.query.lon && element.lat == request.query.lat);
    if (data)
    res.status(200).send(weatherData)
}

app.listen(PORT, () => console.log('I am a server that is listening'));