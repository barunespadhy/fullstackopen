const mongoose = require('mongoose')
const serverConfig = require('../serverConfig')
mongoose.set('strictQuery', false)

const url = serverConfig.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })


const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required:true
  },
  author: {
    type: String,
    required:true
  },
  url: {
    type: String,
    required:true
  },
  likes: {
    type: Number,
    default: 0
  }
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)