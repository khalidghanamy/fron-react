import React ,{useState,useEffect}from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {ToastContainer,toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {register} from "../../Storage/api/userApi.js"
const Register = () => {
    const navigate= useNavigate()
    const [values,setValues]=useState({
        name:'',
        email:'',
        password:'',
        confirmPassword:'',
    });

    useEffect(()=>{
      if(localStorage.getItem("task-user")){
          navigate("/")
      }
  },[])
  
    //============== toast handler ===============
    const headers = {
        "Content-Type": "application/json",
        
      };
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
        

        const data= await register(values);
            console.log(data);
       if(data.status===false){
           toast.error(data.msg,toastOption)}
           if(data.status===true){
             localStorage.setItem("task-user",JSON.stringify(data.newUser))
             localStorage.setItem("token",JSON.stringify(data.accessToken))
             console.log(data);
             navigate("/")
            }
          }
      }
     
    
    //=====================validation=======================

    const handleValidation=()=>{
        const {password,confirmPassword,name,email}=values;
        console.log(values);
        if(password!==confirmPassword){
          
         toast.error(' passowrd and confirm password should be same. ',toastOption);
         return false;
        }else if (name.length<3){
            toast.error(' username must be greater than 3',toastOption);
            return false;

        }else if (password.length<8){
            toast.error(' password must at least than 8',toastOption);
            return false;

        }else if (email===""){
            toast.error(' email is required',toastOption);
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
            <h3>Register</h3>
        </div>
      <Form onSubmit={(e) => handleSubmit(e)}
      className="card-body">
    
      
        <fieldset>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="name">User Name</Form.Label>
            <Form.Control id="name"
            name="name"
            required
            type="text"
            onChange={(event)=> handleChange(event)}
            
             />
          </Form.Group>
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
          </Form.Group>
          {/* ======================================================== */}
          <Form.Group className="mb-3">
            <Form.Label htmlFor="confirmPassword">Confirm password </Form.Label>
            <Form.Control id="confirmPassword" 
            name="confirmPassword"
            type="password"
            onChange={(event)=> handleChange(event)}
            
             />
          </Form.Group>
          
          
          {/* ======================================================== */}


         <div className='d-flex justify-content-center'>
            
          <Button type="submit">Register</Button>
          <span className='m-2'>
          or <Link to="/login">Login</Link>
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

export default Register;