import React ,{useState,useEffect}from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {ToastContainer,toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {login} from "../../Storage/api/userApi.js"
const Login = () => {
    const navigate= useNavigate()
    const [values,setValues]=useState({
       
        email:'',
        password:'',
   
    });

    useEffect(()=>{
        if(localStorage.getItem("task-user")){
            navigate("/")
        }
    },[])
    //============== toast handler ===============

    const toastOption={
        position:"top-right",
        autoClose:8000,
        pauseOnHover:true,
        draggable:true,
        
        theme:"dark",
        
     }
    //=====================handle Submit=======================
    const handleSubmit=async (event)=>{
        event.preventDefault();
       if(handleValidation()){
        

    const data= await login(values);
            console.log(data);
           if(data.status===false){
           toast.error(data.msg,toastOption)}
           if(data.status===true){
               localStorage.setItem("task-user",JSON.stringify(data.user))
                  navigate("/")
            }
        }
    }
     
    
    //=====================validation=======================

    const handleValidation=()=>{
        const {password,email}=values;
        console.log(values);
        if(email===""||password===""){
          
         toast.error(' Email and Password are required ',toastOption);
         return false;
        }
        return true
        ;
    }

    const handleChange=(event)=>{
        setValues({...values,[event.target.name]:event.target.value})
    }

return (
<>
<div className="card mt-5">
        <div className="card-header d-flex justify-content-center">
            <h3>Login</h3>
        </div>
      <Form onSubmit={(e) => handleSubmit(e)}
      className="card-body">
    
      
        <fieldset>
        
          {/* ======================================================== */}
          <Form.Group className="mb-3">
            <Form.Label htmlFor="email">Email</Form.Label>
            <Form.Control id="email" 
            name="email"
            required
            
            type="email"
            onChange={(event)=> handleChange(event)}
            
            />
          </Form.Group>
          {/* ======================================================== */}
          <Form.Group className="mb-3">
            <Form.Label htmlFor="password">Password </Form.Label>
            <Form.Control id="password" 
            name="password" 
            type="password"
            onChange={(event)=> handleChange(event)}
            
             />
             <Link to="/forgetpassword">Forgot Password</Link>
          </Form.Group>
          {/* ======================================================== */}
         <div className='d-flex justify-content-center'>
            
          <Button type="submit">Login</Button>
          <span className='m-2'>
          or if you don not have account <Link to="/register">Register</Link>
          </span>
          </div>
        </fieldset>
      </Form>

    </div>
<ToastContainer  toastStyle={{ backgroundColor: "crimson" }}>

</ToastContainer>

</>
);
}

export default Login;
