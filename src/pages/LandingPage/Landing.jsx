import React from 'react'
import { Link } from 'react-router-dom'

function Landing() {
  return (
    <div className=' flex justify-center items-center p-24'>
      <Link to="/admin" className='bg-black text-white p-4 rounded-xl'>Admin</Link>
    </div>
  )
}

export default Landing
