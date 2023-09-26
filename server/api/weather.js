const express = require('express');
const request = require('request');

const app = express();

app.get('/weather/:city', (req, res) => {
    const city = req.params.city;
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY&units=imperial`;
    request(url, (error, response, body) => {
        if (error) {
            res.status(500).send({ message: 'Error retrieving weather data', error });
        } else {
            const data = JSON.parse(body);
            res.send(data);
        }
    });
});


app.listen(3000, () => console.log('Server started on port 3000'));

