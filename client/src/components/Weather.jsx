import React, { useEffect, useState } from "react";

import axios from "axios";

import img from "./bg.jpg";

function Weather() {
  const [city, setCity] = useState('Delhi');

  const [Weather,seWeather] =useState({temp:'',feelsLike:'',weatherD:'',weatherCode:'',city1:"",date:''})

  const [error, setError] = useState(null);

  const [list,setList]=useState([])
//   const cityName = {city}


const onchange =(e)=>{

    setCity(e.target.value)



}


async function fetch(){
  const res = await axios.post("http://localhost:4000");
}

  async function fetchData() {
    const res = await axios.post("http://localhost:4000",{city});

    seWeather(res.data.data)
    setList(res.data.fulldata.list.slice(0,10))
    console.log(res.data.fulldata.list.slice(0,10));
  }

  const convertTo12HourFormat = (dt_txt) => {
    const dateObj = new Date(dt_txt);

    let hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();

    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'

    const minutesFormatted = minutes < 10 ? '0' + minutes : minutes;

    return `${hours}:${minutesFormatted} ${ampm}`;
};
  
  useEffect(() => {
    fetchData();
    


  },[city]);

  return (
    <div
      class="bg-cover bg-center min-h-screen flex items-center justify-center"
      style={{ backgroundImage: "url('http://localhost:4000/bg.jpg')" }}
    >
      <div class="flex flex-col space-y-4">
        <div class="bg-white bg-opacity-30 backdrop-blur-lg rounded-3xl p-8 md:p-12 w-full max-w-4xl mx-4 md:mx-0">
          <div class="flex flex-col md:flex-row justify-between items-center md:space-x-8">
            <div class="flex flex-col  space-y-4 ">
              <div class="flex items-center space-x-2">
                <span class="text-4xl">
                <img
            src={`http://openweathermap.org/img/wn/${Weather.weatherCode}@2x.png`}
            // alt={weather.weather[0].description}
          />

                </span>
                <span class="text-6xl font-bold text-orange-500">{Weather.temp}</span>
              </div>
              <div class="text-xl text-gray-700">{Weather.weatherD}</div>
              <div class="text-xl text-white-500">
                <div >{Weather.city1}</div>
                <div>{Weather.date}</div>
                <div>Feels like {Weather.feelsLike}</div>
              </div>
            </div>
            <div class="mt-8 md:mt-0">
              <h2 class="text-2xl font-semibold mb-3 ml-5">City</h2>
              <div class="bg-white bg-opacity-50 backdrop-blur-md rounded-2xl p-4 flex items-center justify-center space-x-2">
                <select
                  class="bg-transparent text-xl text-gray-700"
                  onChange={onchange}
                  defaultValue={city}
                >
                  <option value={'New-york'}>New-york</option>
                  <option value={'Delhi'}>Delhi</option>
                  <option value={'Mosco'}>Mosco</option>
                  <option value={'Paris'}>Paris</option>
                  <option value={'Sydney'}>Sydney</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div class=" bg-white bg-opacity-30 backdrop-blur-lg rounded-3xl p-8 md:p-12 w-full max-w-4xl mx-4 md:mx-0">
          <div class="mt-8 grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            {list.map((data)=>{
return(
   <div class="bg-white bg-opacity-50 backdrop-blur-md rounded-2xl p-4">
     <div class="text-xl">
    { convertTo12HourFormat(data.dt_txt)}
     </div>
         <div class="text-2xl font-semibold  fa-regular fa-cloud ">
  {Math.round(data.main.temp-273)+ "°C"}
</div>
</div>)

            })}
           
           
          </div>
        </div>
        <div class="bg-white bg-opacity-30 backdrop-blur-lg rounded-3xl p-8 md:p-12 w-full max-w-4xl mx-4 md:mx-0">
          <div class="mt-8">
            <h3 class="text-xl font-semibold mb-2">Random Text</h3>
            <p class="text-black-600">
              Improve him believe opinion offered met and end cheered forbade.
              Friendly as stronger speedily by recurred. Son interest wandered
              sir addition end say. Manners beloved affixed picture men ask.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weather;
