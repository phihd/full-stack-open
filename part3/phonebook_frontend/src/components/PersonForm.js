import React from 'react'

const PersonForm = ({ addPerson, newPerson, handleContactChange }) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input name="name" value={newPerson.name} onChange={handleContactChange} />
      </div>
      <div>
        number: <input name="number" value={newPerson.number} onChange={handleContactChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm