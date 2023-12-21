const mongoose = require('mongoose')
require('dotenv').config()

const title = process.argv[2]
const author = process.argv[3]
const blogurl = process.argv[4]
const likes = process.argv[5]

mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGODB_TEST_URI)

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

const blog = new Blog({
  title: title,
  author: author,
  url: blogurl,
  likes: likes
})

blog.save().then((result) => {
  console.log('blog list')
  Blog.find().then((result) => {
    result.forEach((blog) => {
      console.log(blog)
    })
    mongoose.connection.close()
  })
})