const PersonForm = (props) => {

  return (
    <form onSubmit={props.addName}>
        <div>name: <input onChange={props.setName}/></div>
        <div>number: <input onChange={props.setNumber}/></div>
        <div><button type="submit">add</button></div>
    </form>
  )
}

export default PersonForm