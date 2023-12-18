const lodash = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, eachBlog) => {
    return sum + eachBlog.likes
  }

  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const maxFinder = (max, eachBlog) => {
    return eachBlog.likes > max.likes ? {title: eachBlog.title, author: eachBlog.author, likes: eachBlog.likes} : {title: max.title, author: max.author, likes: max.likes}
  }
  return blogs.reduce(maxFinder)
}

const mostBlogs = (blogs) => {
  const authorList = lodash.countBy(
    lodash.map(
      blogs, 
      function (eachBlog){
        return eachBlog.author
      })
  )
  const author = lodash.maxBy(lodash.keys(authorList), (key) => authorList[key])
  return {author: author, blogs: authorList[author]}
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}