import { useEffect } from 'react'
const Notification = (props) => {
  useEffect(() => {
    setTimeout(() => {
      props.setNotification(null)
    }, 4000)
  }, [props.notification])
  return (
    props.notification ?
    <div className={props.notification.notificationClass}>
      {props.notification.message}
    </div> : ""
  )
}

export default Notification