const Persons = (props) => {

  return (
    <div>
        {
          props.persons.map(eachContact => (
            ((eachContact.name).toLowerCase()).includes((props.filter).toLowerCase()) ? (<p key={eachContact.id}>{eachContact.name}: {eachContact.number}<button onClick={() => props.deleteEntry(eachContact.id, eachContact.name)}>delete</button></p>) : ""
          ))
        }
      </div>
  )
}

export default Persons