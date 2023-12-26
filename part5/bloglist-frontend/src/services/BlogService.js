import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const postBlog = (blogPost, token) => {
  return axios.post(baseUrl, blogPost, {headers: { Authorization: `Bearer ${token}` }})
}

export default { 
  getAll,
  postBlog
}