const Part = (props) => {
  return (
    <div>
      <div><p>{props.partContent.name}: {props.partContent.exercises}</p></div>
    </div>
  )
}

export default Part