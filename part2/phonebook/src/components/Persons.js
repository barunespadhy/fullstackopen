const Persons = (props) => {

  return (
    <div>
        {
          props.persons.map(eachContact => (
            ((eachContact.name).toLowerCase()).includes((props.filter).toLowerCase()) ? (<p key={eachContact.id}>{eachContact.name}: {eachContact.number}</p>) : ""
          ))
        }
      </div>
  )
}

export default Persons