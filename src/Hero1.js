import React from 'react'
import './Hero1.css'

export default function hero(props) {
  const modeStyle = {
    backgroundColor: props.mode === 'dark' ? 'white' : 'grey',
  };

  
  return (
    <div className='hero' style={modeStyle}>
  <video alt="hello" src="/computer2.mp4" autoPlay loop muted/>
</div>
  )
}
