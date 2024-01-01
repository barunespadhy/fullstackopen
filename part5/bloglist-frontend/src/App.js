import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import UserSession from './components/UserSession'
import Notification from './components/Notification'

const App = () => {
  const [userDetails, setUserDetails] = useState(null)
  const [notification, setNotification] = useState({
    notificationClass: '',
    message:''
  })
  const blogs = [{
    title: 'Test Blog',
    author: 'Test Author',
    url: 'TestURL',
    user: [{
      username: 'TestUser'
    }],
    likes: 0
  }]

  return (
    <div>
      <Notification notification={notification} setNotification={setNotification}/>
      <UserSession setNotification={setNotification} userDetails={userDetails} setUserDetails={setUserDetails} />
      <Blog blogs={blogs} setNotification={setNotification} userDetails={userDetails} setUserDetails={setUserDetails} test={false}/>
    </div>
  )
}

export default App