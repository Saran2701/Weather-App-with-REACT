import { useEffect, useState } from 'react'
import './App.css'

import searchIcon from './assets/searchicon.png';
import clear from './assets/clear.png';
import cloud from './assets/cloud.png';
import drizzle from './assets/drizzle.png';
import humidity from './assets/humidity.png';
import rain from './assets/rain.png';
import snow from './assets/snow.png';
import wind from './assets/wind.png';

const WeatherDetails =({icon , temp ,city ,country , lat,log,Humidity,Wind})=>{
  return(
    <>
  <div className="image">
    <img src={icon} alt="image"/>
  </div>
  <div className="temp">{temp}°C</div>
  <div className="location">{city}</div>
  <div className="country">{country}</div>
  <div className="cord">
    <div>
      <span className="lat">latitute </span>
      <span>{lat}</span>
    </div>
    <div>
      <span className="log">longtitude </span>
      <span>{log}</span>
    </div>
  </div>
  <div className="data-container">
    <div className="element">
      <img src={humidity} alt="icon" className="icon"/>
    </div>
    <div className="data">
      <div className="humidity-percent">{Humidity} %</div>
      <div className="text">HUmidity</div>
    </div>
    <div className="element">
      <img src={wind} alt="icon" className="icon"/>
    </div>
    <div className="data">
      <div className="wind-percent">{Wind} km/h</div>
      <div className="text">wind speed</div>
    </div>
  </div>
  </>
  );
};


function App() {
const [text,setText] = useState("Erode");

  const [icon,setIcon] = useState(cloud);
  const [temp,setTemp] = useState(0);
  const [city,setCity] = useState("Erode")
  const [country,setCountry] = useState("In");
  const [lat,setLat] = useState(0);
  const [log,setLog] = useState(0);
  const [Humidty,setHumidity] = useState(0);
  const [Wind,setWind] = useState(0);
  const[citynotfound,setCityNotFound] = useState(false);
  const[loading,setLoading] = useState(false);
  const[error,setError]= useState(null);

const weathericonmap ={
  "01d":clear,
  "01n":clear,
  "02d":cloud,
  "02n":cloud,
  "03d":drizzle,
  "03n":drizzle,
  "04d":drizzle,
  "04n":drizzle,
  "09d":rain,
  "09n":rain,
  "10d":rain,
  "10n":rain,
  "12d":snow,
  "12n":snow,
};

  const search = async()=>{
    setLoading(true)
    let url =`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=c88813f9b721eac9a3ba53368c04b081&units=Metric
    `
    try{
      let res = await fetch(url);
      let data = await res.json();
      
      if(data.cod=== "404"){
        console.error("City Not found");
        setCityNotFound(true);
        setLoading(false);
        return;
      }

      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setTemp(Math.floor(data.main.temp));
      setCity(data.name);
      setCountry(data.sys.country);
      setLat(data.coord.lat);
      setLog(data.coord.lon);
      const weatherIcon=data.weather[0].icon;
      setIcon(weathericonmap[weatherIcon] || clear);
      setCityNotFound(false);
    }
    catch (error){
        console.error("An error "+ error.message);
        setError("Error occured while fetcing the data");
    }
    finally{
      setLoading(false);
    }
    };

    const handlecity =(e) =>{
      setText(e.target.value)
    };

    const handlekeydown = (e)=>{
      if(e.key==="Enter"){
        search();
      }
    }

    useEffect(function(){
      search();
    },[]);

  return (
    <>
      <div className='container'> 
      <div className="input-container">
        <input type="text" 
                className='city-input' 
                placeholder='Search City' 
                onChange={handlecity}
                value={text}
                onKeyDown={handlekeydown}/>
        <div className="search-icon" onClick={()=>search()}>
          <img src={searchIcon} alt='Search'/>
        </div>
        </div>
       {!loading && !citynotfound && <WeatherDetails icon={icon} temp={temp} city={city}
        country = {country} lat={lat} log={log} Humidity={Humidty} Wind={Wind}/>}
       
       {loading && <div className="loading">Loading...</div>}
       {error && <div className="error">{error}</div>}
       {citynotfound&&<div className="city-notfound">City not found</div>}
       <div className="owner">
        Designed by <span>Saran</span>
       </div>
        </div>
    </>
  )
}

export default App
