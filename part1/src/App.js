import Header from './components/header/Header';
import Content from './components/content/Content';
import Total from './components/total/Total';

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  
  return (
    <div>
      <Header course={course} />
      <Content content={[{name:part1, num: exercises1},{name: part2,num: exercises2},{name:part3,num: exercises3}]} />
      <Total total={exercises1+exercises2+exercises3} />
    </div>
  )
}

export default App