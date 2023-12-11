import CountryInfo from './CountryInfo'
import { useState, useEffect } from 'react'
import CountryInformationService from '../services/CountryInformationService'


const Countries = (props) => {
  const renderCountryInfo = props.filter.filteredCountries.length === 1 ? true : false
  const renderCountryList = props.filter.filteredCountries.length > 10 ? false : true
  const [renderShowButtonInfo, setRenderShowButtonInfo] = useState(false)
  const [countryInfo, setCountryInfo] = useState('')
  const setRenderShowButtonState = (name) => {
    CountryInformationService.getCountry(name).then(response => {
        setCountryInfo(response.data)
        setRenderShowButtonInfo(true)
      }
    )
  }
  return (
    renderShowButtonInfo ? <CountryInfo countryObject={countryInfo} /> : renderCountryInfo ? <CountryInfo countryObject={props.filter.filteredCountries[0]}/> : renderCountryList ? props.filter.filteredCountries.map(value => <p>{value.name.common}<button onClick={() => setRenderShowButtonState(value.name.common)}>show</button></p>) : <p>Too many matches, please specify another filter </p>
  )
}

export default Countries