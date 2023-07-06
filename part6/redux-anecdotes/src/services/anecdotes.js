import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const update = async (newAnecdotes) => {
  const {id} = newAnecdotes
  const response = await axios.patch(`${baseUrl}/${id}`, newAnecdotes)
  return response.data
}

// eslint-disable-next-line
export default { getAll, createNew, update }