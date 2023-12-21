const Blog = require('../models/BlogModel')

const initialBlogs = [{
    title: 'Test1',
    author: 'Test author1',
    url: 'testesteste1',
    likes: 5
  },
  {
    title: 'Test2',
    author: 'Test author2',
    url: 'testesteste2',
    likes: 6
  }]

const getBlogs = async () => {
  const blogs = await Blog.find({})
  return blogs.map(eachBlog => eachBlog.toJSON())
}

module.exports = {
  initialBlogs,
  getBlogs
}