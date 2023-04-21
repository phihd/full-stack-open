import { useEffect, useState } from 'react'
import React from 'react'
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import personService from "./services/Persons"



const App = () => {

  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState({
    name: '',
    number: '',
  })
  const [filter, setFilter] = useState("");
  const [personsToShow, setPersonsToShow] = useState([]);


  useEffect(() => {
    personService
      .getAll()
      .then((returnedPerson) => {
        setPersons(returnedPerson)
        setPersonsToShow(returnedPerson)
      })
  }, [])


  const addPerson = (event) => {
    event.preventDefault()
    const currentName = persons.find(person => person.name === newPerson.name)
    // If added name doesn't exist, create new contact
    if (currentName === undefined) {
      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          setPersonsToShow(persons.concat(returnedPerson));
        })
    }
    else {
      if (window.confirm(
        `${newPerson.name} is already added to phonebook, replace the old number with a new one?`
      )) {
        personService
          .update(currentName.id, newPerson)
          .then(returnedPerson => {
            const updatedPersonsWithANewNumber = persons.map(person => person.id === returnedPerson.id ? returnedPerson : person)
            setPersons(updatedPersonsWithANewNumber)
            setPersonsToShow(updatedPersonsWithANewNumber)
          })
      }
    }
    setNewPerson({ 
      name: "", 
      number: "" 
    })
  }

  const deletePerson = (person) => {
    const {id, name} = person
    if (window.confirm(`Delete ${name} ?`)) {
      personService.remove(id).then(response => {
        const updatedPersonsWithDeletedNumber = persons.filter(person => person.id !== id)
        setPersons(updatedPersonsWithDeletedNumber)
        setPersonsToShow(updatedPersonsWithDeletedNumber)
      })
    }

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
      <Persons personsToShow={personsToShow} deletePerson={deletePerson}/>
    </div>
  )
}

export default App