import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote, addAnecdote } from "./reducers/anecdoteReducer"

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const handleVote = (id) => {
    dispatch(voteAnecdote(id))
  }

  const handleAddAnecdote = (event) => {
    event.preventDefault()
    dispatch(addAnecdote(event.target.anecdote.value))
    event.target.anecdote.value = ''
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={handleAddAnecdote}>
        <div>
          <input name='anecdote' />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App