const Notification = (props) => {
  return (
    <div className={props.notificationProps.notificationClass}>
      {props.notificationProps.message}
    </div>
  )
}

export default Notification