import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote, initializeAnecdotes } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const dispatch = useDispatch() 
  
  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])

  const handleVote = (anecdote) => {
    dispatch(voteAnecdote(anecdote))
    dispatch(createNotification(`you voted '${anecdote.content}'`, 5))
  }

  return (
    <div>
      {Object.values(anecdotes)
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        )}
    </div>
  )

}

export default AnecdoteList