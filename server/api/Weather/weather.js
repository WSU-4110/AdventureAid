const express = require('express');
const axios = require('axios');
require('dotenv').config();

const router = express.Router();
const API_KEY = process.env.OPEN_WEATHER_API_KEY;

class WeatherUrlBuilder {
    buildUrl(params) {
        throw new Error('This method should be overridden by subclass');
    }
}

class CityUrlBuilder extends WeatherUrlBuilder {
    buildUrl({ city }) {
        return `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=imperial`;
    }
}

class CityIdUrlBuilder extends WeatherUrlBuilder {
    buildUrl({ cityId }) {
        return `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${API_KEY}&units=imperial`;
    }
}

class LatLonUrlBuilder extends WeatherUrlBuilder {
    buildUrl({ lat, lon }) {
        return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`;
    }
}

class ZipCodeUrlBuilder extends WeatherUrlBuilder {
    buildUrl({ zipCode }) {
        return `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${API_KEY}&units=imperial`;
    }
}

router.get('/:city', async (req, res) => {
    let urlBuilder;
    const { city } = req.params;
    const { cityId, lat, lon, zipCode } = req.query;

    if (city) {
        urlBuilder = new CityUrlBuilder();
    } else if (cityId) {
        urlBuilder = new CityIdUrlBuilder();
    } else if (lat && lon) {
        urlBuilder = new LatLonUrlBuilder();
    } else if (zipCode) {
        urlBuilder = new ZipCodeUrlBuilder();
    } else {
        return res.status(400).send({ message: 'No location information provided' });
    }

    const url = urlBuilder.buildUrl({ city, cityId, lat, lon, zipCode });

    try {
        const response = await axios.get(url);
        const data = response.data;
        res.send({
            city: data.name,
            temperature: data.main.temp,
            weather: data.weather[0].description,
            humidity: data.main.humidity,
            wind: data.wind.speed,
        });
    } catch (error) {
        if (error.response) {
            return res.status(error.response.status).send({ message: 'Error retrieving weather data', error: error.response.data });
        } else {
            return res.status(500).send({ message: 'Unknown error', error: error.message });
        }
    }
});

module.exports = router;
