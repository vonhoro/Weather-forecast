import React, { useState } from 'react';
//'http://api.openweathermap.org/data/2.5/weather?q={city name},{state code},{country code}&appid=267c33939e7a04fdd9dbf811478f489c'
function Gif(){

   const [searchValue,setSearchValue] = useState('');
   const [cityName,setCityName] = useState('');//cityname name
   const [sunset,setSunset] = useState();//sys.sunset
   const [sunrise,setSunrise] = useState();//sys.sunrise
   const [weatherDescription,setWeatherDescription] = useState('');//some dumb astring weather[0].description
   const [weatherMain,setWeatherMain] = useState('');//some dumb arrayy weather[0].main
   const [temperature,setTemperature] = useState('');//Celcius main.temp
   const [humidity,setHumidity] = useState('');//Celcius main.humidity %
   const [windSpeed,setWindSpeed] = useState('');//wind.speed m/s
   const [clouds,setClouds] = useState('');//cloudiness, clouds.all%
   const [imgUrl,setImgUrl] = useState('');//cloudiness, clouds.all%
   const [error,setError] = useState(false);
  const sendSearch = async(e) =>{
      e.preventDefault();
      
      try{
      
        const responseWeather = await fetch(`https://api.openweathermap.org/data/2.5/weather?appid==${searchValue}&units=metric&`
        );
        const dataObjectWeather = await responseWeather.json();
        const dateSunset = new Date(parseInt(dataObjectWeather.sys.sunset)*1000);
        const hourSunset = (dateSunset.getHours()).toString().padStart(2,0);
        const minutesSunset = (dateSunset.getMinutes()).toString().padStart(2,0);
        const timeTillSunset = `${hourSunset}:${minutesSunset}`;
        const dateSunrise = new Date(parseInt(dataObjectWeather.sys.sunrise)*1000);
        const hourSunrise = (dateSunrise.getHours()).toString().padStart(2,0);
        const minutesSunrise = (dateSunrise.getMinutes()).toString().padStart(2,0);
        const timeTillSunrise = `${hourSunrise}:${minutesSunrise}`;
        setCityName(dataObjectWeather.name);
        setSunset(timeTillSunset);
        setSunrise(timeTillSunrise);
        setWeatherDescription(dataObjectWeather.weather[0].description);
        setWeatherMain(dataObjectWeather.weather[0].main);
        setTemperature(dataObjectWeather.main.temp);
        setHumidity(dataObjectWeather.main.humidity);
        setWindSpeed(dataObjectWeather.wind.speed);
        setClouds(dataObjectWeather.clouds.all);
        const responseImg = await fetch(`https://api.giphy.com/v1/gifs/search?api_key==${dataObjectWeather.weather[0].main}-forecast&limit=1`);
        const dataObjectImg = await responseImg.json();
        setImgUrl(dataObjectImg.data[0].images.original.url)
        setError(false);
      }
      catch(err){
         console.log(err);
         setError(true);
      }
   }
  
   return(
      <div className="Container">
        <form className="Za-Formu" onSubmit={sendSearch}>
          <input 
            type="text"
            required
            placeholder="Rome,Italy"
            onChange={(e)=> setSearchValue(e.target.value)}
          />
          <input 
            autofocus
            type="submit"
            value="Search"
          />
        </form>
        <div className={(cityName === '' && !error)? 'Invisible' : ''}>
        <h1 
          className={(error)? 'Error' : 'Not-seen'}>
          Be more specific!
        </h1>
        </div>
        <div className={(cityName === '')? 'Invisible' : "Weather-Data"}>
          <h1 className="Info">City: {cityName}</h1>
          <h1 className="Info">Sunrise at: {sunrise}</h1>
          <h1 className="Info">Sunset at: {sunset}</h1>
          <h1 className="Info">Cloudines: {clouds}%</h1>
          <h1 className="Info">Weather:{weatherDescription}</h1>
          <h1 className="Info">Temperature:{temperature} ºC</h1>
          <h1 className="Info">Humidity: {humidity}%</h1>
          <h1 className="Info">Wind speed: {windSpeed} m/sec</h1>
          </div>
          <img className={(cityName === '')? "Invsible" : "Gif"} src={imgUrl} alt={weatherMain}/>
      </div>
   
   )
   
   
}

function App() {
    return (
         <div className="App">
          <h1 className="Title"> Enter the name of The city and Click on Search</h1>
          <Gif />          
          </div>
          );
}
export default App;
