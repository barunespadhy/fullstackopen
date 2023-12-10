import Part from './Part';

const Content = (props) => {
  return (
    <div>
      {props.content.map(eachCourse => (
        <Part key={eachCourse.id} partContent={eachCourse} />
      ))}
    </div>
  )
}

export default Content