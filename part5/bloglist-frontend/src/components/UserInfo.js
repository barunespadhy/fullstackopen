const UserInfo = (props) => {

  const logoutUser = () => {
    window.localStorage.removeItem('loginToken')
    props.setUserDetails({})
    props.setNotification({
      message: 'Logout was successfull',
      notificationClass: 'success'
    })
  }

  return (
    <div>
      <form onSubmit={logoutUser}>
        <h3>Hi, {props.userDetails.name} ({props.userDetails.username})! </h3>
        <button type='submit'>Logout</button>
      </form>
    </div>
  )
}

export default UserInfo