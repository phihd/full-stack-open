import { useState } from 'react'
import React from 'react'



const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])

  const [newName, setNewName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      window.confirm(`${newName} is already added to phonebook`)
    }
    else {
      const personsCopy = [...persons]
      const personObject = { name: newName }
      personsCopy.push(personObject)
      setPersons(personsCopy)
    }
    setNewName('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person => (
          <div key={person.name}> {person.name}{" "} </div>
        ))}
      </div>
    </div>
  )
}

export default App