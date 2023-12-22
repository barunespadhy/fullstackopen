const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
require('express-async-errors')
const serverConfig = require('./serverConfig')
const middleware = require('./utils/middleware')
app.use(middleware.tokenExtractor)
const blogRouter = require('./routes/blog_router')
const userRouter = require('./routes/user_router')
const loginRouter = require('./routes/login_router')

app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))

app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.use(middleware.errorHandler)

module.exports = app;