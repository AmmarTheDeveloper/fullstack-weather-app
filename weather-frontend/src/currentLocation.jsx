import React, { useState, useEffect } from "react";
import apiKeys from "./apiKeys";
import moment from "moment";
import Forcast from "./forcast";
import loader from "./images/WeatherIcons.gif";
import ReactAnimatedWeather from "react-animated-weather";

const dateBuilder = ( d ) => {
  const months = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
  ];
  const days = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];
  return `${ days[ d.getDay() ] }, ${ d.getDate() } ${ months[ d.getMonth() ] } ${ d.getFullYear() }`;
};

const defaults = {
  color: "white",
  size: 112,
  animate: true,
};

const Weather = () => {
  const [ weatherData, setWeatherData ] = useState( {
    lat: undefined,
    lon: undefined,
    temperatureC: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    icon: "CLEAR_DAY",
    main: undefined,
    currentTime: moment().format( "HH:mm:ss" ),
  } );

  useEffect( () => {
    if ( navigator.geolocation ) {
      navigator.geolocation.getCurrentPosition(
        ( position ) => getWeather( position.coords.latitude, position.coords.longitude ),
        () => {
          getWeather( 28.67, 77.22 );
          alert( "You have disabled location service. Allow this app to access your location for real-time weather." );
        }
      );
    } else {
      alert( "Geolocation not available" );
    }

    const interval = setInterval( () => {
      if ( weatherData.lat && weatherData.lon ) {
        getWeather( weatherData.lat, weatherData.lon );
      }
      setWeatherData( ( prev ) => ( { ...prev, currentTime: moment().format( "HH:mm:ss" ) } ) );
    }, 1000 );

    return () => clearInterval( interval );
  }, [ weatherData.lat, weatherData.lon ] );

  const getWeather = async ( lat, lon ) => {
    try {
      const response = await fetch( `${ apiKeys.base }weather?lat=${ lat }&lon=${ lon }&units=metric&APPID=${ apiKeys.key }` );
      const data = await response.json();
      const iconMapping = {
        Haze: "CLEAR_DAY",
        Clouds: "CLOUDY",
        Rain: "RAIN",
        Snow: "SNOW",
        Dust: "WIND",
        Drizzle: "SLEET",
        Fog: "FOG",
        Smoke: "FOG",
        Tornado: "WIND",
      };

      setWeatherData( {
        lat,
        lon,
        city: data.name,
        country: data.sys.country,
        temperatureC: Math.round( data.main.temp ),
        humidity: data.main.humidity,
        main: data.weather[ 0 ].main,
        icon: iconMapping[ data.weather[ 0 ].main ] || "CLEAR_DAY",
        currentTime: moment().format( "HH:mm:ss" ),
      } );
    } catch ( error ) {
      console.error( "Error fetching weather data:", error );
    }
  };

  return weatherData.temperatureC ? (
    <>
      <div className="city">
        <div className="title">
          <h2>{ weatherData.city }</h2>
          <h3>{ weatherData.country }</h3>
        </div>
        <div className="mb-icon">
          <ReactAnimatedWeather icon={ weatherData.icon } { ...defaults } />
          <p>{ weatherData.main }</p>
        </div>
        <div className="date-time">
          <div className="dmy">
            <div className="current-time">{ weatherData.currentTime }</div>
            <div className="current-date">{ dateBuilder( new Date() ) }</div>
          </div>
          <div className="temperature">
            <p>
              { weatherData.temperatureC }°<span>C</span>
            </p>
          </div>
        </div>
      </div>
      <Forcast icon={ weatherData.icon } weather={ weatherData.main } />
    </>
  ) : (
    <>
      <img src={ loader } style={ { width: "50%", WebkitUserDrag: "none" } } alt="Loading..." />
      <h3 style={ { color: "white", fontSize: "22px", fontWeight: "600" } }>Detecting your location</h3>
      <h3 style={ { color: "white", marginTop: "10px" } }>
        Your current location will be displayed on the app <br /> & used for calculating real-time weather.
      </h3>
    </>
  );
};

export default Weather;
