const Part = (props) => {
  return (
    <div>
      <div>Total Exercises: {props.partContent.name}: {props.partContent.exercises}</div>
    </div>
  )
}

export default Part