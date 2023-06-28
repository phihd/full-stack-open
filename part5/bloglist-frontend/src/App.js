import React from 'react'
import { useState, useEffect, useRef } from 'react'
import './index.css'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [message, setMessage] = useState({
    text: null,
    isError: false,
  })
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage({ text: 'wrong username or password', isError: true })
      setTimeout(() => {
        setMessage({ text: null, isError: false })
      }, 5000)
    }
  }

  const loginForm = () => {
    return (
      <Togglable buttonLabel='login'>
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </Togglable>
    )
  }

  const blogForm = () => (
    <div>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            updateLikes={updateLikes}
            deleteBlog={deleteBlog}
            current_username={user.username}
          />
        )}
    </div>
  )

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }



  const createBlog = async (newBlog) => {
    try {
      blogFormRef.current.toggleVisibility()
      const blog = await blogService.create(newBlog)
      setBlogs(blogs.concat(blog))
      setMessage({
        text: `A new blog ${newBlog.title} by ${newBlog.author} added`,
        isError: false
      })
    } catch (exception) {
      setMessage({
        text: exception.response.data.error,
        isError: true
      })
    }
  }

  const updateLikes = async (id, blogToUpdate) => {
    try {
      const updatedBlog = await blogService.update(id, blogToUpdate)
      const newBlogs = blogs.map(
        blog => blog.id === id ? updatedBlog : blog
      )
      setBlogs(newBlogs)
    } catch (exception) {
      setMessage({
        text: exception.response.data.error,
        isError: true
      })
    }
  }

  const deleteBlog = async (blogId) => {
    try {
      await blogService.remove(blogId)
      const updatedBlogs = blogs.filter(
        blog => blog.id !== blogId
      )
      setBlogs(updatedBlogs)
      setMessage({
        text: 'Blog removed',
        isError: false
      })
    } catch (exception) {
      setMessage({
        text: exception.response.data.error,
        isError: true
      })
    }
  }

  const blogFormRef = useRef()


  return (
    <div>
      <h2>blogs</h2>
      <Notification text={message.text} isError={message.isError} />

      {user === null && loginForm()}
      {user && <div>
        <p>
          {user.name} logged in
          <button onClick={handleLogout}>logout</button>
        </p>

        <Togglable buttonLabel='new blog' ref={blogFormRef}>
          <BlogForm createBlog={createBlog} />
        </Togglable>
        {blogForm()}
      </div>
      }

    </div>
  )
}

export default App