const express = require('express')
const cors = require('cors')
const router = require('./router')


const server = express()
server.use(express.json())
server.use(cors()) // for stretch
server.use('/api/posts', router)


server.listen(9000, () => console.log('The API works'))