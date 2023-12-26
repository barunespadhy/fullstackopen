import { useState, useEffect } from 'react'
import UserSessionService from '../services/UserSessionService'
import { jwtDecode } from "jwt-decode";

import BlogService from '../services/BlogService'

const CreateBlog = (props) => {
  const [title, setTitle] = useState('') 
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('') 

  const handleBlogPost = async (event) => {
    event.preventDefault()
    try{
      let response = await BlogService.postBlog({
        title: title,
        author: author,
        url: url
      }, window.localStorage.getItem('loginToken'))
      props.setNotification({
        message: `A new blog ${title} by ${author} added`,
        notificationClass: "success"
      })
      props.loadBlogs()
    }
    catch(error){
      props.setNotification({
        message: error.response.data.error,
        notificationClass: "error"
      })
    }
  }

  return (
    <div>
      <h3>Add a new blog post</h3>
      <form onSubmit={handleBlogPost}>
        <div>Title: <input onChange={(event) => setTitle(event.target.value)}/></div>
        <div>Author: <input onChange={(event) => setAuthor(event.target.value)}/></div>
        <div>Url: <input onChange={(event) => setUrl(event.target.value)}/></div>
        <div><button type="submit">Add</button></div>
      </form>
    </div>
  )
}

export default CreateBlog