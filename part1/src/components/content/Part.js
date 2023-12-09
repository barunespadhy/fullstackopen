const Part = (props) => {
  return (
    <div>
      <div>{props.partContent.name}: {props.partContent.num}</div>
    </div>
  )
}

export default Part