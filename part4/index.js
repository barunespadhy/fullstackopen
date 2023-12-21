const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
require('express-async-errors')
const serverConfig = require('./serverConfig')
const middleware = require('./utils/middleware')

app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))
const Blog = require('./models/BlogModel')

app.get('/api/blogs', async (request, response) => {
  const blogs = await Blog.find({})
  response.status(200).json(blogs)
})

app.get('/api/blogs/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog){
    response.status(200).json(blog)
  }
  else{
    response.status(400).end()
  }
})

app.delete('/api/blogs/:id', async (request, response) => {
  const blog = await Blog.findByIdAndDelete(request.params.id)
  if (blog){
    response.status(204).json(blog)
  }
  else{
    response.status(400).end()
  }
})

app.put('/api/blogs/:id', async (request, response) => {
  const body = request.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.blogurl,
    likes: body.likes
  }
  const blogs = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true, runValidators: true, context: 'query'})
  if (blogs){
    response.status(204).json(blogs)
  }
  else{
    response.status(400).json(blogs)
  }
})

app.post('/api/blogs', async(request, response) => {
  const blog = new Blog(request.body)
  const result = await blog.save()
  response.status(201).json(result)
})


app.use(middleware.errorHandler)


app.listen(serverConfig.PORT, () => {
  console.log(`Server running on port ${serverConfig.PORT}`)
})

module.exports = app;