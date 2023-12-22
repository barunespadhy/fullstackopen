const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
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


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    minLength: 3,
    required: true
  },
  name: {
    type: String,
  },
  passwordHash: {
    type: String,
    required: true
  },
  blogs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog'
  }]
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

module.exports = mongoose.model('User', userSchema)