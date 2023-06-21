import React from 'react'

const Filter = ({ filter, handleSearchChange }) => {
  return (
    <div>
      filter shown with <input value={filter} onChange={handleSearchChange} />
    </div>
  )
}

export default Filter