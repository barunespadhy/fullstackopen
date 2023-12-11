import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'
const openWeatherBaseURL = 'https://api.openweathermap.org/data/2.5'
const apiKey = process.env.REACT_APP_API_KEY;

const getAll = () => {
  return axios.get(`${baseUrl}/all`)
}

const getCountry = countryName => {
  return axios.get(`${baseUrl}/name/${countryName}`)
}

const getWeather = (lat, lon) => {
  return axios.get(`${openWeatherBaseURL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
}

export default { 
  getAll: getAll, 
  getCountry: getCountry,
  getWeather: getWeather
}