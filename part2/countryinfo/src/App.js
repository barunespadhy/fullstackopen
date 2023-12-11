import { useState, useEffect } from 'react'
import axios from 'axios'
import CountryInformationService from './services/CountryInformationService'
import Countries from './components/Countries'
import Filter from './components/Filter'


const App = () => {
  const [countries, setCountries] = useState([
    {
      name: {common: ""}
    },
  ])
  const [filterProperties, setFilterProperties] = useState({
    text: '',
    filteredCountries: []
  })

  const setFilter = (e) => {
    setFilterProperties({
      text: e.target.value,
      filteredCountries: countries.filter(eachCountry => 
        ((eachCountry.name.common).toLowerCase()).includes((e.target.value).toLowerCase())
      )
    })
  }

  useEffect(() => {
    CountryInformationService.getAll().then(response => {
        setCountries(response.data)
      }
    )
  }, [])

  return (
    <div>
      <h2>Country finder 5000</h2>
      <Filter setFilter={setFilter} />
      <Countries filter={filterProperties}/>
    </div>
  )
}

export default App