const express = require("express");

const axios = require("axios");

const router = express.Router();

const weatherModel = require("../model/model");

router.post("/", async (req, res) => {
  try {
    // Make a GET request to an external API

    // console.log(req,"hhdhh");
const city = req.body.city 
// console.log(req.body);

// console.log(city);

    const response = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=2ad420c066d3c82004a7d0b1a1663cdf`
    );
    // console.log(response.data[0].lat);
    // console.log(response.data,"cccd");
    const lat = response.data[0].lat;
    const lon = response.data[0].lon;

    const weather = await axios.get(
      `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=2ad420c066d3c82004a7d0b1a1663cdf`
    )
    // res.json(weather.data)

    console.log(weather.data);

    let temp = Math.round(weather.data.list[0].main.temp - 273) + "°C";

    let feelsLike =Math.round(weather.data.list[0].main.feels_like - 273) + "°C";

    let weatherD = weather.data.list[0].weather[0].main;

    let weatherCode = weather.data.list[0].weather[0].icon;

    const date = new Date();

    const city1 = weather.data.city.name + "," + weather.data.city.country;

    const newWeather = new weatherModel({
      temp,
      feelsLike,
      weatherD,
      weatherCode,
      date,
      city1,
    });

    console.log(temp,feelsLike,weatherD,date,city1);

   const  weatherData = weather.data

    newWeather.save();

    res.status(200).json({ data: newWeather ,fulldata :weatherData});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
