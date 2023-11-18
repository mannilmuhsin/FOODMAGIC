import React from 'react'
import './Forminput.css'

function Forminput(props) {
  return (
    <div className='forminput'>
        {/* <label htmlFor="">Username</label> */}
      <input type="text" placeholder={props.placeholder} />
    </div>
  )
}

export default Forminput
