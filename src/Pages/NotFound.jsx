

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card'
const NotFound = () => {
    return (
        
    
    <>
    <Card  style={{
        width: '48vw',
        height: '50vh',
        marginTop: '10vh',
        textAlign: 'center',
        border: '1px solid #ced4da',
        borderRadius: '0.25rem',  
        boxShadow: '0px 0px 10px #930f8ac9',

        textShadow: '0px 0px 10px #ced4da', 
    }}>

      
          <Card.Img variant="top" src="https://assets.prestashop2.com/sites/default/files/styles/blog_750x320/public/blog/2019/10/banner_error_404.jpg" />
        <Card.Body>
        <Link  className='btn btn-success m-3' to="/">Go to Home</Link>
        </Card.Body>
    </Card>
   
    </>
    
   

    
    
    );


    }
    export default NotFound;