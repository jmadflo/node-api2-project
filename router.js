const express = require('express')
const data = require('./data/db')

const router = express.Router()

// base url for these routes is http://localhost:9000/api/posts

router.post('/', (req, res) => {
    // res.send(req.body)
    // if title or contents are missing, give error 400
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

router.post('/:id/comments', (req, res) => {
    // res.send(req.body)
    // return 404 error if comment does not have a text value
    if (req.body.text) {
        // find the post that the comment is supposed to be for and return 404 error if it isn't found
        data.findById(req.params.id)
            .then(targetPost => {
                // insert the comment to the post and return error 500 if not successful
                data.insertComment({ text: req.body.text, post_id: targetPost[0].id })
                    .then(commentIdObject => {
                        // retrieve new comment and return it to the client
                        data.findCommentById(commentIdObject.id)
                            .then(insertedComment => {
                                res.status(201).json(insertedComment)
                            })
                            .catch(error => alert(error))
                    })
                    .catch(() => {
                        res.status(500).json({ error: "There was an error while saving the comment to the database" })
                    })
            })
            .catch(() => {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            })
    } else {
        res.status(400).json({ errorMessage: "Please provide text for the comment." })
    }
})

module.exports = router