import PropTypes from 'prop-types'

import { useEffect } from 'react'
const Notification = (props) => {
  useEffect(() => {
    setTimeout(() => {
      props.setNotification({
        notificationClass: '',
        message:''
      })
    }, 4000)
  }, [props.notification])
  return (
    !props.notification.isEmpty ?
      <div className={props.notification.notificationClass}>
        {props.notification.message}
      </div> : ''
  )
}

Notification.propTypes = {
  notification: PropTypes.object.isRequired,
  setNotification: PropTypes.func.isRequired
}


export default Notification