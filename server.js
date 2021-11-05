'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const axios = require('axios');
const handleGetWeather = require('./weather.js');
const handleGetMovies = require('./movies.js');
app.use(cors());

const PORT = process.env.PORT;

const { request } = require('express');


app.get('/weather', handleGetWeather);
app.get('/movies', handleGetMovies);
app.get('/*', (req, res) => res.status(404).send('Pathway not found'));

app.listen(PORT, () => console.log(`I am a server that is listening on port: ${PORT}`));