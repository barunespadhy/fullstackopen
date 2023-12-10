import Header from './header/Header';
import Content from './content/Content';
import Total from './total/Total';

const Course = (props) => {

  return (
    <div>
      <Header course={props.course.name} />
      <Content content={props.course.parts} />
      <Total total={props.course.parts} />
    </div>
  )
}

export default Course