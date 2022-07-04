import React ,{useState,useEffect}from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {ToastContainer,toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { resetPassword} from "../../Storage/api/userApi.js"
const ResetPassword = () => {
    
    const navigate= useNavigate()
    const [isPasswordChanged,setIsPasswordChanged]=useState(false)
    const { id,token } = useParams();
    const [values,setValues]=useState({
       
        password:'',
        confirmPassword:'',
        id,
        token
   
    });

    //get link parameters
    


    useEffect(()=>{
        if(localStorage.getItem("task-user")){
            navigate("/home")
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
        

    const data= await resetPassword(values);
        console.log(data);
    if(data.status===false){
        toast.error(data.msg,toastOption)
    }
        if(data.status===true){
            setIsPasswordChanged(true)
         }
            }
        }
    
     
    
    //=====================validation=======================

    const handleValidation=()=>{
        const {password,confirmPassword,}=values;
        console.log(values);
        if(password!==confirmPassword){
          
         toast.error(' passowrd and confirm password should be same. ',toastOption);
         return false;
        }else if (password.length<8){
            toast.error(' password must at least than 8',toastOption);
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
        <div className="card-header">
            <h3>Reset password</h3>
        </div>
      {!isPasswordChanged && <Form onSubmit={(e) => handleSubmit(e)}
      className="card-body">
    
      
        <fieldset>
        
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
            
          <Button type="submit">Change password</Button>
          <span className='m-2'>
          or Get a valid link  <Link to="/forgetpassword">Resend Link</Link> 
          </span>
       
          </div>
        </fieldset>
      </Form>}
      {
          isPasswordChanged && 
             <div className="card-header">
            <h3>Password changed successfully <span> <Link className='btn btn-success' to="/login">Login</Link> </span> </h3>
           
        </div>
        
      }

    </div>
<ToastContainer  toastStyle={{ backgroundColor: "crimson" }}>

</ToastContainer>

</>
);
}

export default ResetPassword;