import { useState, useEffect } from 'react'
import CreateBlog from './CreateBlog'
import Togglable from './Togglable'
import BlogService from '../services/BlogService'
import { jwtDecode } from 'jwt-decode'


const Blog = (props) => {

  const [blogs, setBlogs] = useState([])
  const currentUser = window.localStorage.getItem('loginToken') ? jwtDecode(window.localStorage.getItem('loginToken')) : 'None'

  useEffect(() => {
    if (props.userDetails)
      loadBlogs()
    else
      setBlogs([])
  }, [props.userDetails])

  const loadBlogs = () => {

    !props.test ?
      BlogService.getAll().then(blogs =>
        setBlogs( (blogs.sort((a, b) => b.likes - a.likes)) )
      ) :
      setBlogs( (props.blogs.sort((a, b) => b.likes - a.likes)) )

  }

  const handleLike = (blog) => {

    !props.test ?
      BlogService.updateBlog(blog.id,{
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes + 1
      }, window.localStorage.getItem('loginToken')).then(blogs =>
        loadBlogs()
      ):
      props.likeButton(blog.id, blog.title, blog.author) //this is the mock function
  }

  const handleDelete = (id, title, author) => {
    if(window.confirm(`Remove blog ${title} by ${author}`))
      BlogService.deleteBlog(id, window.localStorage.getItem('loginToken')).then(blogs =>
        loadBlogs()
      )
  }

  return (
    <div>

      {
        props.userDetails ?
          <div>
            <CreateBlog loadBlogs={loadBlogs} setNotification={props.setNotification} test={false}/>
            <h3>All blogs</h3>
            { blogs.map (blog =>
              <div key={blog.id} style={{ 'borderStyle':'solid', 'padding': '1em', 'marginBottom': '5px' }}>
                <p className='blogTitleParagraph'>{blog.title} {blog.author}</p>

                <Togglable buttonLabel={'Show more'} hideButtonLabel={'Show less'}>
                  <p>{blog.url}</p>
                  <p>{blog.likes} likes <button className='likeButton' type='submit' onClick={() => handleLike(blog)}>like</button></p>
                  <p>Blog creator: {blog.user[0].name ? `${blog.user[0].name} (${blog.user[0].username})` : 'Anonymous User'}</p>
                  {blog.user[0].username === currentUser.username ? <button type='submit' onClick={() => handleDelete(blog.id, blog.title, blog.author) }>Remove</button> : ''}
                  <br></br>
                </Togglable>

              </div>
            )}
          </div> :
          <h3>Please login to view/create blogs</h3>
      }
    </div>
  )
}



export default Blog