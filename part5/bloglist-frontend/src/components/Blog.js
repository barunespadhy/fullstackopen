import { useState, useEffect } from 'react'
import CreateBlog from './CreateBlog'
import BlogService from '../services/BlogService'

const Blog = (props) => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    if (props.userDetails)
      loadBlogs()
    else
      setBlogs([])
  }, [props.userDetails])

  const loadBlogs = () => {
    BlogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }

  return (
    <div>

      {
        props.userDetails ? 
        <div>
          <CreateBlog loadBlogs={loadBlogs} setNotification={props.setNotification}/>
          <h3>All blogs</h3>
            {blogs.map(blog =>
              <p key={blog.id}>{blog.title}: {blog.author}</p>
            )}
        </div> : 
        <h3>Please login to view/create blogs</h3>
      }
    </div>
  )
}

export default Blog