import React from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

const Persons = ({ personsToShow, deletePerson }) => {
  return (
    <div>
      {personsToShow.map(person => (
        <div key={person.name}>
          {person.name} {person.number}{" "}
          <Button handleClick={() => deletePerson(person)} text="delete" />
        </div>
      ))}
    </div>
  )
}

export default Persons