import { useState } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
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