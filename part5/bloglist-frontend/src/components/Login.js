import { useState, useEffect } from 'react'
import UserSessionService from '../services/UserSessionService'
import { jwtDecode } from 'jwt-decode'

const Login = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    try{
      let userLoginDetails = await UserSessionService.getUser({
        username: username,
        password: password
      })
      userLoginDetails = userLoginDetails.data
      window.localStorage.setItem('loginToken', userLoginDetails.token)
      window.localStorage.setItem('name', userLoginDetails.name)
      const userDetails = jwtDecode(userLoginDetails.token)
      props.setUserDetails({
        name: userLoginDetails.name,
        username: userLoginDetails.username
      })
      props.setNotification({
        message: 'Login was successfull',
        notificationClass: 'success'
      })
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
      <h1>Login to application</h1>
      <form onSubmit={handleLogin}>
        <div>username: <input onChange={(event) => setUsername(event.target.value)}/></div>
        <div>password: <input type='password' onChange={(event) => setPassword(event.target.value)}/></div>
        <div><button type='submit'>Login</button></div>
      </form>
    </div>
  )
}

export default Login