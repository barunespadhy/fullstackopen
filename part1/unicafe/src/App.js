import { useState } from 'react'

function handleClick (props) {
    props.stateSetter(props.stat + 1)
}

const Button = (props) => (
  <button onClick={(e) => handleClick(props)}>
    {props.text}
  </button>
)

const StatisticLine = (props) => {
  return (
    <tr>
      <th>{props.statName}</th>
      <th>{props.statData}</th>
    </tr>
  )
}

const Statistics = (props) => {

  if (props.stats[0] === 0 && props.stats[1] === 0 && props.stats[2] === 0)
    return (<div>No feedback given</div>)
  return(
    <div>
      <table>
        <thead>
          <StatisticLine statName={"good"} statData={props.stats[0]}/>
          <StatisticLine statName={"neutral"} statData={props.stats[1]}/>
          <StatisticLine statName={"bad"} statData={props.stats[2]}/>
          <StatisticLine statName={"all"} statData={props.stats[0]+props.stats[1]+props.stats[2]}/>
          <StatisticLine statName={"average"} statData={((props.stats[0]+props.stats[1]+props.stats[2])/3).toFixed(2)}/>
          <StatisticLine statName={"positive"} statData={((props.stats[0]/(props.stats[0]+props.stats[1]+props.stats[2]))*100).toFixed(2) + "%"}/>
        </thead>
      </table>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button text={"good"} stat={good} stateSetter={setGood}/>
      <Button text={"neutral"} stat={neutral} stateSetter={setNeutral} />
      <Button text={"bad"} stat={bad} stateSetter={setBad}/>
      <h1>statistics</h1>
      <Statistics stats={[good, neutral, bad]}/>
    </div>
  )
}

export default App