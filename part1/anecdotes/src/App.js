import { useState } from 'react'

function handleClick (props) {
  if (props.buttonText === "vote"){
    var tempArr = [...props.stateData[1]];
    var currentSelection = props.stateData[0];
    tempArr[currentSelection] = tempArr[currentSelection] + 1;
    props.stateSetter(tempArr);
  }
  if (props.buttonText === "next anecdote"){
    var index = Math.floor(Math.random() * 7);
    if (props.stateData === index){
      index = Math.floor(Math.random() * 7);
      props.stateSetter(index);
    }
    else
      props.stateSetter(index);
  }
}

const Button = (props) => (
  <button onClick={(e) => handleClick(props)}>
    {props.buttonText}
  </button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [voteArray, setVoteArray] = useState(Array(8).fill(0))

  return (
    <div>
      <h1>Anecdotes of the day</h1>
      <h4>{anecdotes[selected]} has {voteArray[selected]} votes.</h4>
      <Button buttonText={"vote"} stateData={[selected,voteArray]} stateSetter={setVoteArray} />
      <Button buttonText={"next anecdote"} stateData={selected} stateSetter={setSelected} />
      <h1>Anecdotes with most votes</h1>
      <h4>{anecdotes[voteArray.indexOf((Math.max(...voteArray)))]} has {voteArray[voteArray.indexOf((Math.max(...voteArray)))]} votes.</h4>
    </div>
  )
}

export default App