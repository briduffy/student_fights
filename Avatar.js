import React from 'react'

const Avatar = ({ name, avatar }) => (
  <div>
    <h5 className='center fighter'>
      {name}
    </h5>
    <img
      className='avatar'
      src={avatar}
      alt='avatar'
    />
  </div>
)

export default Avatar
