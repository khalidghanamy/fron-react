
import React from 'react'
import Logout from './AuthComponents/Logout'
import {Link} from 'react-router-dom'
import {Navbar,Nav,Container} from 'react-bootstrap'
function NavBar() {

  return (
     <>
      <Navbar 
fixed='top'
      bg="dark" variant="dark"
    
      >

 <Container>
 <Nav className="me-auto">
  
    <Link className='btn btn-success m-1' to="/home">Home</Link>
        
    <Logout/>
 </Nav>
 <Nav className='d-flex justify-content-center'>
<h1 style={{color:"white"}} >Task Manager</h1>
 </Nav>
 </Container>
</Navbar>
     </>
  )
}

export default NavBar