import React, { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  // user data from api
  const [ dataToRender, setDataToRender] = useState([])
  // need a dependency for the useEffect hook to fetch updated data every time we modify
  const [ postFormValues, setPostFormValues ] = useState({
    id: '',
    title: '',
    contents: '',
  })

  const [ commentFormValues, setCommentFormValues ] = useState({
    id: '',
    text: '',
  })

  // update form values
  const updatePostForm = event => {
    setPostFormValues({
      ...postFormValues,
      [event.target.name]: event.target.value
    })
  }

  const updateCommentForm = event => {
    setCommentFormValues({
      ...commentFormValues,
      [event.target.name]: event.target.value
    })
  }

  // get all user data
  const getAllPosts = () => {
    axios.get('http://localhost:9000/api/posts/')
      .then(response => {
        console.log(response)
        setDataToRender(response.data)
      })
      .catch(error => console.log(error))
  }

  // get a specific user by id
  const getPostById = () => {
    axios.get(`http://localhost:9000/api/posts/${postFormValues.id}`)
      .then(response => {
        console.log(response)
        setDataToRender(response.data)
      })
      .catch(error => console.log(error))
  }

  // get comments with post id
  const getCommentsById = () => {
    axios.get(`http://localhost:9000/api/posts/${postFormValues.id || commentFormValues.id}/comments`)
      .then(response => {
        console.log(response)
        setDataToRender(response.data)
      })
      .catch(error => console.log(error))
  }

  // post a new user
  const postNewPost = () => {
    axios.create({headers: {'Content-Type': 'application/json'}})
      .post('http://localhost:9000/api/posts/', {
        title: postFormValues.title,
        contents: postFormValues.contents
      })
      .then(response => {
        console.log(response)
        setDataToRender(response.data)
      })
      .catch(error => console.log(error))
  }

  // post a new comment by post id
  const postNewComment = () => {
    axios.create({headers: {'Content-Type': 'application/json'}})
      .post(`http://localhost:9000/api/posts/${postFormValues.id || commentFormValues.id}/comments`, {
        text: commentFormValues.text
      })
      .then(response => {
        console.log(response)
        setDataToRender(response.data)
      })
      .catch(error => console.log(error))
  }

  // delete post by id
  const deletePost = () => {
    axios.delete(`http://localhost:9000/api/posts/${postFormValues.id || commentFormValues.id}`)
      .then(response => {
        console.log(response)
        setDataToRender([response.data])
      })
      .catch(error => console.log(error))
  }

  // edit post with post id
  const editPost = () => {
    axios.create({headers: {'Content-Type': 'application/json'}})
      .put(`http://localhost:9000/api/posts/${postFormValues.id || commentFormValues.id}`, {
        title: postFormValues.title,
        contents: postFormValues.contents
      })
      .then(response => {
        console.log(response)
        setDataToRender(response.data)
      })
      .catch(error => console.log(error))
  }


  return (
    <div className='App'>
      <h1>API Tester</h1>
      <div className='formAndButtons'>
        <div className='formContainer'>
          <form>
            <h2>Post Form</h2>
            <input name='id' placeholder='id' value={postFormValues.id} onChange={updatePostForm}/>
            <input name='title' placeholder='title' value={postFormValues.title} onChange={updatePostForm}/>
            <input name='contents' placeholder='contents' value={postFormValues.contents} onChange={updatePostForm}/>
          </form>
          <form>
            <h2>Comment Form</h2>
            <input name='id' placeholder='post id' value={commentFormValues.id} onChange={updateCommentForm}/>
            <input name='text' placeholder='text' value={commentFormValues.text} onChange={updateCommentForm}/>
          </form>
        </div>
        <div className='buttonContainer'>
          <button onClick={getAllPosts}>Get All Posts</button>
          <button onClick={getPostById}>Get Post By Id</button>
          <button onClick={getCommentsById}>Get Comments By Post Id</button>
          <button onClick={postNewPost}>Post New Post</button>
          <button onClick={postNewComment}>Post New Comment</button>
          <button onClick={deletePost}>Delete Post</button>
          <button onClick={editPost}>Edit Post</button>
        </div>
      </div>
      {/* render data */}
      {dataToRender.map(instance => {
        // will render if instance is a post
        if (instance.title){
          return (
            <div key={instance.id} className='instance'>
              <p>Id: {instance.id}</p>
              <p>Title: {instance.title}</p>
              <p>Contents: {instance.contents}</p>
              <p>Created At: {instance.created_at}</p>
              <p>Updated At: {instance.updated_at}</p>
            </div>
          )
        } else if (instance.message){ // will render if instance is a message object
          return (
            <div key={instance.message} className='instance'>
              <p>Message: {instance.message}</p>
            </div>
          )
        } else { // will render if instance is a comment
          return (
            <div key={instance.id} className='instance'>
              <p>Id: {instance.id}</p>
              <p>Text: {instance.text}</p>
              <p>Created At: {instance.created_at}</p>
              <p>Updated At: {instance.updated_at}</p>
              <p>Post Id: {instance.post_id}</p>
              <p>Post: {instance.post}</p>
            </div>
          )
        }  
      })}
    </div>
  )
}

export default App
