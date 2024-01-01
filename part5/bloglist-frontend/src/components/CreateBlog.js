import { useState, useRef } from 'react'
import BlogService from '../services/BlogService'
import Togglable from './Togglable'
import PropTypes from 'prop-types'

const CreateBlog = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const blogFormRef = useRef()

  const handleBlogPost = (event) => {
    event.preventDefault()
    !props.test ?
      addBlog() :
      props.addBlog({
        title: title,
        author: author,
        url: url
      })
  }

  const addBlog = async (event) => {
    try{
      await BlogService.postBlog({
        title: title,
        author: author,
        url: url
      }, window.localStorage.getItem('loginToken'))
      props.setNotification({
        message: `A new blog ${title} by ${author} added`,
        notificationClass: 'success'
      })
      props.loadBlogs()
      blogFormRef.current.toggleVisibility()
    }
    catch(error){
      props.setNotification({
        message: error.response.data.error,
        notificationClass: 'error'
      })
    }
  }


  return (
    <div>
      <Togglable buttonLabel={'Create blog'} hideButtonLabel={'Done'} ref={blogFormRef}>
        <h3>Add a new blog post</h3>
        <form onSubmit={handleBlogPost}>
          <div>Title: <input className='titleInput' onChange={(event) => setTitle(event.target.value)}/></div>
          <div>Author: <input className='authorInput' onChange={(event) => setAuthor(event.target.value)}/></div>
          <div>Url: <input className='urlInput' onChange={(event) => setUrl(event.target.value)}/></div>
          <div><button className='createBlog' type='submit'>Add</button></div>
        </form>
      </Togglable>
    </div>
  )
}

CreateBlog.propTypes = {
  //loadBlogs: PropTypes.func.isRequired, -------------------> Disabled for testing
  //setNotification: PropTypes.func.isRequired ---------------> Disabled for testing
}

export default CreateBlog