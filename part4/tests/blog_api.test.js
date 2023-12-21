const mongoose = require('mongoose')
const Blog = require('../models/BlogModel')
const blog_test_helper = require('../utils/blog_api_helper')
const supertest = require('supertest')
const app = require('../index')
const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(blog_test_helper.initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(blog_test_helper.initialBlogs[1])
  await blogObject.save()
})

describe('Blog Tests related to exercises 4.8-4.12', () => {

  test('Test for number of blogs (Exercise 4.8)', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(2)
  })

  test('Check that id is used instead of _id in the db as a unique identifier (Exercise 4.9)', async () => {
    const blogs = await blog_test_helper.getBlogs()
    blogs.forEach(blog => {
      expect(blog.id).toBeDefined()
    })
  })

  test('Test that a valid blog can be added (Exercise 4.10)', async () => {
    const newBlog = {
      title: 'Test3',
      author: 'Test author3',
      url: 'testesteste3',
      likes: 5
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await blog_test_helper.getBlogs()
    const contents = response.map(r => r.title)
    expect(response).toHaveLength(blog_test_helper.initialBlogs.length + 1)
    expect(contents).toContain(
      'Test3'
    )
  })

  test('Default to 0 likes if likes does not exist (Exercise 4.11)', async () => {
    const newBlogWithoutLike = {
      title: 'Test4',
      author: 'Test author4',
      url: 'testesteste4',
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlogWithoutLike)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toBeDefined()
  })

  test('Respond with 400 if title or url is not provided (Exercise 4.12)', async () => {
    const newBlogWithoutLikeTitleUrl = {
      author: 'Test author4',
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlogWithoutLikeTitleUrl)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

  test('Delete a blog (Exercise 4.13)', async () => {
    const response = await blog_test_helper.getBlogs()
    const idToRemove = response[0].id
    const blogToRemove = response[0]

    await api
      .delete(`/api/blogs/${idToRemove}`)
      .expect(204)

    const blogsAfterDeletion = await blog_test_helper.getBlogs()
    expect(blog_test_helper.initialBlogs.length - 1)
    expect(blogsAfterDeletion).not.toContain(blogToRemove)
  })

  test('Update a blog (Exercise 4.14)', async () => {
    const blogs = await blog_test_helper.getBlogs()
    let blogToUpdateID = blogs[0].id
    let blogToUpdate = blogs[0]
    blogToUpdate.likes = 10
    
    await api
      .put(`/api/blogs/${blogToUpdateID}`)
      .send(blogToUpdate)
      .expect(204)

    const response = await blog_test_helper.getBlogs()
    expect(response[0].likes).toBe(10)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})