import { useState, useEffect } from 'react'
import axios from 'axios'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setFilterText] = useState('')

  const addName = (e) => {
    var addEntry = false;
    e.preventDefault();
    for (var i=0; i<persons.length; i++){
      if (persons[i].name === newName){
        addEntry = false;
        break;
      }
      else
        addEntry = true;
    }

    if (addEntry){
      var tempArr = [...persons]
      tempArr.push({
        name: newName,
        number: newNumber,
        id: tempArr.length+1
      })
      setPersons(tempArr)
    }
    else
      window.alert(`${newName} is already added to phonebook`)
  }

  const setName = (e) => {
    setNewName(e.target.value)
  }
  const setNumber = (e) => {
    setNewNumber(e.target.value)
  }
  const setFilter = (e) => {
    setFilterText(e.target.value)
  }

  useEffect(() => {
    const eventHandler = response => {
      setPersons(response.data)
    }
    const promise = axios.get('http://localhost:3001/persons')
    promise.then(eventHandler)
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter setFilter={setFilter} />
      <h2>Add a new</h2>
      <PersonForm addName={addName} setName={setName} setNumber={setNumber}/>
      <h2>Numbers</h2>
      <Persons filter={filterText} persons={persons} />
    </div>
  )
}

export default App