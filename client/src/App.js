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
    created_at: '',
    updated_at: ''
  })

  const [ commentFormValues, setCommentFormValues ] = useState({
    id: '',
    text: '',
    created_at: '',
    updated_at: '',
    post_id: '',
    post: ''
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
  // const postNew = () => {
  //   axios.create({headers: {'Content-Type': 'application/json'}})
  //     .post('http://localhost:8000/api/dataToRender/', {
  //       name: formValues.name,
  //       bio: formValues.bio
  //     })
  //     .then(response => {
  //       console.log(response)
  //     })
  //     .catch(error => console.log(error))
  // }

  

  // // delete user by id
  // const deleteUser = () => {
  //   axios.delete(`http://localhost:8000/api/dataToRender/${formValues.id}`)
  //     .then(response => {
  //       console.log(response)
  //     })
  //     .catch(error => console.log(error))
  // }

  // // edit user with put request
  // const editUser = () => {
  //   axios.create({headers: {'Content-Type': 'application/json'}})
  //     .put(`http://localhost:8000/api/dataToRender/${formValues.id}`, {
  //       name: formValues.name,
  //       bio: formValues.bio
  //     })
  //     .then(response => {
  //       console.log(response)
  //     })
  //     .catch(error => console.log(error))
  // }


  return (
    <div className='App'>
      <h1>API Tester</h1>
      <div className='formAndButtons'>
        <form>
          <h2>Post Form</h2>
          <input name='id' placeholder='id' value={postFormValues.id} onChange={updatePostForm}/>
          <input name='title' placeholder='title' value={postFormValues.title} onChange={updatePostForm}/>
          <input name='contents' placeholder='contents' value={postFormValues.contents} onChange={updatePostForm}/>
          <input name='created_at' placeholder='created_at' value={postFormValues.created_at} onChange={updatePostForm}/>
          <input name='updated_at' placeholder='updated_at' value={postFormValues.updated_at} onChange={updatePostForm}/>
        </form>
        <form>
          <h2>Comment Form</h2>
          <input name='id' placeholder='id' value={commentFormValues.id} onChange={updateCommentForm}/>
          <input name='text' placeholder='text' value={commentFormValues.text} onChange={updateCommentForm}/>
          <input name='created_at' placeholder='created_at' value={commentFormValues.created_at} onChange={updateCommentForm}/>
          <input name='updated_at' placeholder='updated_at' value={commentFormValues.updated_at} onChange={updateCommentForm}/>
          <input name='post_id' placeholder='post_id' value={commentFormValues.post_id} onChange={updateCommentForm}/>
          <input name='post' placeholder='post' value={commentFormValues.post} onChange={updateCommentForm}/>
        </form>
        <div className='buttonContainer'>
          <button onClick={getAllPosts}>Get All Posts</button>
          <button onClick={getPostById}>Get Post By Id</button>
          <button onClick={getCommentsById}>Get Comments By Post Id</button>
          {/* <button onClick={postNewPost}>Post New Post</button>
          <button onClick={postNewComment}>Post New Comment</button>
          <button onClick={deletePost}>Delete Post</button>
          <button onClick={editPost}>Edit Post</button> */}
        </div>
      </div>
      {/* render data */}
      {dataToRender.map(instance => {
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
        } else {
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

// [
//   {
//       "id": 1,
//       "title": "Thoughts of mine",
//       "contents": "cool and interesting stuff as well located here!!!",
//       "created_at": "2019-05-11 01:55:52",
//       "updated_at": "2019-05-11 01:55:52"
//   }
// ]

// [
//   {
//       "id": 7,
//       "text": "A good travel has no fixed plans and is not intent upon arriving. A good artist lets his intuition lead him where ever it wants.",
//       "created_at": "2019-05-11 01:55:52",
//       "updated_at": "2019-05-11 01:55:52",
//       "post_id": 5,
//       "post": "You need people of intelligence on this sort of mission...quest...thing."
//   }
// ]
export default App
