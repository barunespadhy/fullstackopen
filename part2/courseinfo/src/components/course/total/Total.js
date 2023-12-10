const Total = (props) => {
  return (
    <div>
      <h4>total of {props.total.reduce((s, p) => {return s + p.exercises}, 0)} exercises </h4>
    </div>
  )
}

export default Total