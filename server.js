const express = require('express');
const bodyParser = require('body-parser');
const app = express()

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')


const request = require('request');
const apiKey = '016c524686df854c835bb3a56872c0e4';

app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
})

app.post('/', function (req, res) {
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

    request(url, function(err, response, body){
        if(err){
            res.render('index', {weather: null, error: 'Error, please try again'});
        } 
        else {
            let weather = JSON.parse(body)
            if(weather.main == undefined){
                res.render('index', {weather: null, error: 'Error, please try again'});
            }
            else {
                var celcius = Math.round((weather.main.temp - 32) * 5/9);
                let weatherText = `It's ${celcius}${String.fromCharCode(176)}C degrees in ${weather.name}!`;
                res.render('index', {weather: weatherText, error: null}); 
            }
        }
    })
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})