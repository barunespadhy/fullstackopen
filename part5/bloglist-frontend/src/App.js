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

  return (
    <div>
      <Notification notification={notification} setNotification={setNotification}/>
      <UserSession setNotification={setNotification} userDetails={userDetails} setUserDetails={setUserDetails} />
      <Blog setNotification={setNotification} userDetails={userDetails} setUserDetails={setUserDetails}/>
    </div>
  )
}

export default App