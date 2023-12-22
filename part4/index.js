const app = require('./app')
const http = require('http')
const serverConfig = require('./serverConfig')

const server = http.createServer(app)

server.listen(serverConfig.PORT, () => {
  console.log(`Server running on port ${serverConfig.PORT}`)
})