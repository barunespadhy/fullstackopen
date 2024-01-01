import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div className='blogWhenNotExpandedContent' style={hideWhenVisible}>
        <button className='blogExpandButton' onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div className='blogWhenExpandedContent' style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>{props.hideButtonLabel}</button>
      </div>
    </div>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  hideButtonLabel: PropTypes.string.isRequired
}

Togglable.displayName = 'Togglable'

export default Togglable