import React from 'react'
import loading from './loading.gif'

const Spinner =()=>{
    return (
      <div className='text-center my-1'>
        <img src={loading} alt="loading" />
      </div>
    )
}
export default Spinner
