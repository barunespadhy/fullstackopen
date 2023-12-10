import { useState, useEffect } from 'react'
import axios from 'axios'
import PhoneBookService from './services/PhoneBookService'
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
    var updateEntry = false;
    var tempArr = [...persons]
    var tempObj;
    e.preventDefault();
    for (var i=0; i<persons.length; i++){
      if (persons[i].name === newName){
        updateEntry = true;
        tempObj = persons[i]
        tempObj.number = newNumber
        break;
      }
      else
        updateEntry = false;
    }

    if (!updateEntry){
      
      var tempDict = {
        name: newName,
        number: newNumber,
        id: tempArr.length+1
      }
      PhoneBookService.create(tempDict).then(response =>{
        tempArr.push(tempDict)
        setPersons(tempArr)
      })
    }
    else{
      PhoneBookService.update(tempObj.id, tempObj).then(response =>
        PhoneBookService.getAll().then(response => 
          {setPersons(response.data)}
        ) 
      )
    }
  }

  const deleteEntry = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      PhoneBookService.deleteEntry(id).then(response => 
      PhoneBookService.getAll().then(response => 
          {setPersons(response.data)}
        ) 
      )
    }
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
    PhoneBookService.getAll().then(response => 
      {setPersons(response.data)}
    )
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter setFilter={setFilter} />
      <h2>Add a new</h2>
      <PersonForm addName={addName} setName={setName} setNumber={setNumber}/>
      <h2>Numbers</h2>
      <Persons filter={filterText} persons={persons} deleteEntry={deleteEntry}/>
    </div>
  )
}

export default App