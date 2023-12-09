import Part from './Part';

const Content = (props) => {
  
  return (
    <div>
      <Part partContent={props.content[0]} />
      <Part partContent={props.content[1]} />
      <Part partContent={props.content[2]} />
    </div>
  )
}

export default Content