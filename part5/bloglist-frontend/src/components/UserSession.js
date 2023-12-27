import { useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import Login from './Login'
import UserInfo from './UserInfo'

const UserSession = (props) => {
  useEffect(() => {
    try{
      const userDetails = jwtDecode(window.localStorage.getItem('loginToken'))
      const name = window.localStorage.getItem('name')
      props.setUserDetails({
        name: name,
        username: userDetails.username
      })
    }
    catch(error){
      //
    }
  }, [])
  return (
    <div>
      {
        props.userDetails ?
          <UserInfo setNotification={props.setNotification} userDetails={props.userDetails} setUserDetails={props.setUserDetails}/> :
          <Login setNotification={props.setNotification} setUserDetails={props.setUserDetails}/>
      }
    </div>
  )
}

export default UserSession