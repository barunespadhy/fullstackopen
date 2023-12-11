import { useState, useEffect } from 'react'
import CountryInformationService from '../services/CountryInformationService'

const CountryInfo = (props) => {
  const [weatherData, setWeatherData] = useState(null)
  useEffect(() => {
    CountryInformationService.getWeather(props.countryObject.capitalInfo.latlng[0],props.countryObject.capitalInfo.latlng[1]).then(response => {
        setWeatherData(response.data)
      }
    )
  }, [])
  return (
    weatherData ? <div>
        <h1>{props.countryObject.name.common}</h1>
        <p>Captial: {props.countryObject.capital}</p>
        <p>Area: {props.countryObject.area}</p>
        <h4>Languages: </h4>
        {props.countryObject.languages ? <ul>{Object.values(props.countryObject.languages).map(value => <li key={value}><p>{value}</p></li>)}</ul> : ""}
        <img src={props.countryObject.flags.png}/>
        <h3>Weather in {props.countryObject.capital}</h3>
        <p>Temperature: {weatherData.main.temp} C</p>
        <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} />
        <p>Wind: {weatherData.wind.speed} m/s</p>
    </div> : <p>Loading Country Info</p>
  )
}

export default CountryInfo