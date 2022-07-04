import { useState ,useEffect} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import useTasks from "../../store/Task.js";
import Modal from 'react-bootstrap/Modal';
import {ToastContainer,toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
const AddTask = ({  }) => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
 
 
      const user = JSON.parse(localStorage.getItem("task-user"))

 
  const [values,setValues]=useState({
    title:'',
    description:'',
    startedAt:'',
    finishedAt:'',
    priority:'Low',
    
});
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [task, setTask] = useState({});
 

  const {createTask} = useTasks()
//==============================
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
    

    const data = await createTask(values,user._id);
        console.log(data);
   if(data.status===false){
       toast.error(data.msg,toastOption)}
        if(data.status===true){
          handleClose()
          
        }
       
      }
  }
 

//=====================validation=======================

const handleValidation=()=>{
    const {
      title,
      description,
      priority,
      startedAt,
      finishedAt,
    } = values;
    console.log(values);
  if (description==="") {
    toast.error("description is required",toastOption);
    return false;
  }
  if (title.length < 3||title==="") {
    toast.error("title must be greater than 3",toastOption);
    return false;
  }

  if (priority==="") {
    toast.error("priority is required",toastOption);
    return false;


  }
  if (
    startedAt > finishedAt ||
    startedAt === finishedAt ||
    startedAt === "" ||
    finishedAt === ""
  ) {
    toast.error("date is invalid",toastOption);
    return false;
  }
  

  return true
  ;
}



const handleChange=(event)=>{
    setValues({...values,[event.target.name]:event.target.value})
}
//==============================

  return (
    <>
    <Button variant="success"className='m-2' onClick={handleShow}>
        <h2>Add new Task</h2>
    </Button>

    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
        <div className="card">
    <div className="card-header">
        <h3>Add Task</h3>
    </div>
    <Form onSubmit={(e) => handleSubmit(e)}
  className="card-body">
       
  
    <fieldset>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="description">Description</Form.Label>
        <Form.Control id="description"
        name="description"
        required
        type="text"
        onChange={(event)=> handleChange(event)}

         placeholder=" description" />
      </Form.Group>
      {/* ======================================================== */}
      <Form.Group className="mb-3">
        <Form.Label htmlFor="title">Title</Form.Label>
        <Form.Control id="title" 
        name="title"
        required
        maxLength="50"
        type="text"
        onChange={(event)=> handleChange(event)}

        placeholder="Title" />
      </Form.Group>
      {/* ======================================================== */}
      <Form.Group className="mb-3">
        <Form.Label htmlFor="startedAt">Start At</Form.Label>
        <Form.Control id="startedAt" 
        name="startedAt"
        type="dateTime-local"
        onChange={(event)=> handleChange(event)}

        placeholder="startedAt" />
      </Form.Group>
      {/* ======================================================== */}
      <Form.Group className="mb-3">
        <Form.Label htmlFor="startAt">Finished At</Form.Label>
        <Form.Control id="finishedAt" 
        name="finishedAt"
        type="dateTime-local"
        onChange={(event)=> handleChange(event)}

        placeholder="finishedAt" />
      </Form.Group>
      {/* ======================================================== */}

      <Form.Group className="mb-3">
        <Form.Label htmlFor="priority">Priority</Form.Label>
        <Form.Select id="priority"
        name="priority"
        onChange={(event)=> handleChange(event)}

        >
          <option value="Low" defaultValue="Low">
            Low
          </option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </Form.Select>
      </Form.Group>
      {/* ======================================================== */}


      <Button type="submit">Submit</Button>
            <Button variant="secondary"
            className="mx-2"
             onClick={handleClose}>
              Close
            </Button>
    </fieldset>
  </Form>

</div>
    </Modal>
    <ToastContainer  toastStyle={{ backgroundColor: "crimson" }}>

</ToastContainer>
  </>
  );
};

export default AddTask;
