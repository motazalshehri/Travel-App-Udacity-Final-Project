const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')
const path = require('path');
const { response } = require('express')
const dotenv = require('dotenv').config()
const { dateHandler } = require('./dateHandler')
const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(express.static('dist'))

module.exports = app;


app.get('/', (req,res) => { 
    res.sendFile('dist/index.html')
})

const port = 8000;

const server = app.listen(port, listening)

function listening(){
    console.log('server running'); 
    console.log(`running on localhost: ${port} `);
}

//apis
const restCountBaseURL = 'https://restcountries.eu/rest/v2/alpha/'
const GeoNBaseURL = 'http://api.geonames.org/searchJSON'
const WBBaseURL = 'https://api.weatherbit.io/v2.0/current'
const WBBaseURL16 = 'https://api.weatherbit.io/v2.0/forecast/daily'
const PBBaseURL = 'https://pixabay.com/api/'


app.post('/getCityInfo', async (req,res) => {

    const {city, date} = req.body

    const {daysAway, today} = dateHandler(date)
    
    const GeoNresponse = await fetch(`${GeoNBaseURL}?q=${city}&maxRows=1&username=${process.env.GEONAMES_KEY}`)
    const GeoNresponsee = await GeoNresponse.json()
    


    if(GeoNresponsee.totalResultsCount == 0) {
        const name = 'invalid'
        res.send({name})
        return
    }
    
    const {lat, lng, name, countryName, countryCode} = GeoNresponsee.geonames[0]
    
    
    if(daysAway < 7) {
        var WBresponse = await fetch(`${WBBaseURL}?&lat=${lat}&lon=${lng}&key=${process.env.WEATHERBIT_KEY}`)
        const WBresponsee = await WBresponse.json()
        // console.log(WBresp2)
        const {data} = WBresponsee
        var {weather, rh, pres, temp, precip} = data[0]
        var {description} = weather
        var forecastDate = today

    }else if(daysAway < 16) {
        var WBresponse = await fetch(`${WBBaseURL16}?&lat=${lat}&lon=${lng}&key=${process.env.WEATHERBIT_KEY}`)
        const WBresponsee = await WBresponse.json()
        const {data} = WBresponsee
        var {weather, rh, pres, temp, precip, valid_date} = data[daysAway]
        var {description} = weather
        var forecastDate = valid_date

    } else {
        var description = '<i class="fas fa-exclamation"></i>Date too far into the future, unable to predict weather forecast'
        var rh = 'Not Found'
        var pres = 'Not Found'
        var temp = 'Not Found'
        var precip = 'Not Found'
        var forecastDate = date
    }

    
    const Pbresponse = await fetch(`${PBBaseURL}?key=${process.env.PIXBAY_KEY}&q=${name}`)
    const PbResponse = await Pbresponse.json()
    if(PbResponse.total != 0){
        var {webformatURL} = PbResponse.hits[0]    
        console.log("city found showing city")
    }else {
        const PbResponsee = await fetch(`${PBBaseURL}?key=${process.env.PIXBAY_KEY}&q=${countryName}`)
        const Pbresponsee = await PbResponse.json()
        var {webformatURL} = Pbresponsee.hits[0]    
        console.log("city not found showing country")
    }

    const RCresponse = await fetch(`${restCountBaseURL}${countryCode}`)
    const RCresponsee = await RCresponse.json()
    const flag = RCresponsee.flag


    let backData = {rh, pres, temp, name, date, precip, description, webformatURL, forecastDate, countryName, flag}
    res.send({rh, pres, temp, name, precip, description, webformatURL, forecastDate, countryName, flag})

})


