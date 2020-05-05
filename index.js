const express = require('express')
const router = require('./router')

const server = express()
server.use(express.json())
server.use('/api/posts', router)

server.listen(9000, () => console.log('The API works'))