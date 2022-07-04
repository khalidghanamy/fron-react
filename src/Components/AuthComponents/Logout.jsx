import React from 'react'
import { useNavigate } from 'react-router-dom'
import {BiPowerOff} from "react-icons/bi"
import Button from 'react-bootstrap/esm/Button'
function Logout() {
    const navigate=useNavigate()
    const handleClick = async ()=>{
        localStorage.clear();
        navigate('/login')
    }
  return (
     <>
      <Button variant='danger'
      className='m-1'
        onClick={handleClick}>

          <BiPowerOff/>

      </Button>
     </>
  )
}

export default Logout