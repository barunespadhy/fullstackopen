const blogRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/BlogModel')
const User = require('../models/UserModel')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
    id: 1,
  })
  response.status(200).json(blogs)
})

blogRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog){
    response.status(200).json(blog)
  }
  else{
    response.status(400).end()
  }
})

blogRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findByIdAndDelete(request.params.id)
  if (blog){
    response.status(204).json(blog)
  }
  else{
    response.status(400).end()
  }
})

blogRouter.put('/:id', async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)
  const blog = {
    title: body.title,
    author: body.author,
    url: body.blogurl,
    likes: body.likes,
    user: user.id

  }
  const blogs = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true, runValidators: true, context: 'query'})
  if (blogs){
    response.status(204).json(blogs)
  }
  else{
    response.status(400).json(blogs)
  }
})

blogRouter.post('/', async(request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id
  })
  const result = await blog.save()
  user.blogs = user.blogs.concat(result._id)
  await user.save()
  response.status(201).json(result)
})


module.exports = blogRouter