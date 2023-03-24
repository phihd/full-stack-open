import { useState } from 'react'
import React from 'react'
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";



const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newPerson, setNewPerson] = useState({
    name: '',
    number: '',
    id: 1
  })
  const [filter, setFilter] = useState("");
  const [personsToShow, setPersonsToShow] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);


  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newPerson.name)) {
      window.confirm(`${newPerson.name} is already added to phonebook`)
    }
    else {
      const personsCopy = [...persons]
      personsCopy.push(newPerson)
      setPersons(personsCopy)
      setPersonsToShow(personsCopy)
    }
    setNewPerson({
      name: '',
      number: '',
      id: 1
    })
  }

  const handleContactChange = (event) => {
    console.log('name: ' + event.target.name + ', value:' + event.target.value)
    const { name, value } = event.target
    setNewPerson({ ...newPerson, [name]: value })
  }

  const handleSearchChange = (event) => {
    const searchInput = event.target.value
    setFilter(searchInput)
    setPersonsToShow(persons.filter(person => person.name.toLowerCase().includes(searchInput.toLowerCase())))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleSearchChange={handleSearchChange} />
      <PersonForm addPerson={addPerson} newPerson={newPerson} handleContactChange={handleContactChange} />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App