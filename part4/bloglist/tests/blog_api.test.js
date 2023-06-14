const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('Some tests', () => {

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('unique identifier is id instead of _id', async () => {
    const response = await api.get("/api/blogs")
    const ids = response.body.map((blog) => blog.id)
    ids.forEach(id => expect(id).toBeDefined())
  })

  test('a valid post can be added', async () => {
    const newPost = {
      "title": "Makeup on the day you go on a trip!",
      "author": "Aya Asahina",
      "url": "https://www.youtube.com/watch?v=mKhq3vfv1Os",
      "likes": 211
    }

    await api
      .post('/api/blogs')
      .send(newPost)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const titles = blogsAtEnd.map(r => r.title)

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    expect(titles).toContain(
      'Makeup on the day you go on a trip!'
    )
  })

  test("likes property will default to 0 if missing", async () => {
    const newPost = {
      "title": "Makeup on the day you go on a trip!",
      "author": "Aya Asahina",
      "url": "https://www.youtube.com/watch?v=mKhq3vfv1Os",
    }

    await api
      .post("/api/blogs")
      .send(newPost)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(0)
  })

  test("backend responds with status 400 if title and url are missing", async () => {
    const newPost = {
      likes: 1,
    };

    await api
      .post("/api/blogs")
      .send(newPost)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

})


afterAll(async () => {
  await mongoose.connection.close()
})
