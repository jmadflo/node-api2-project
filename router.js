const express = require('express')
const data = require('./data/db')

const router = express.Router()

// base url for these routes is http://localhost:9000/api/posts

router.post('/', (req, res) => {
    // if title or contents are missing, give error 400
    // res.json(req.body)
    if (req.body.title && req.body.contents){
        // if insertion is successful return status 201 otherwise return status 500 error
        data.insert(req.body)
            .then(idObject => {
                data.findById(idObject.id)
                    .then(insertedPost => {
                        res.status(201).json(insertedPost)
                    })
                    // if post cannot be retrieved then alert error
                    .catch(error => {
                        alert(error)
                    })
            })
            .catch(() => { 
                res.status(500).json({ error: "There was an error while saving the post to the database" })
            })
    } else {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    }
})

module.exports = router