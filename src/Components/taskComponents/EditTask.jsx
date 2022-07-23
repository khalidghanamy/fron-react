import {useState,useCallback} from 'react';
import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import useTasks from '../../store/Task';
import {ToastContainer,toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

import {AiFillEdit} from 'react-icons/ai';


function EditeTask({task,setTasksTest}) {

  const [show, setShow] = useState(false);
  const {updateTask,getAllTasks} = useTasks()
  const [evento, setEvento] = useState(undefined)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [taskData, setTaskData] = useState(task);
   
    
 

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
event.preventDefault()
  setEvento(event)
  if(handleValidation()){
    const user = JSON.parse(localStorage.getItem("task-user"));

    await updateTask(task.id,taskData);
    const data = await  getAllTasks(user._id);
    console.log(data.userTasks);
    setTasksTest(data.userTasks);
    handleClose()
     
 
    toast.success("Task Updated Successfully",toastOption)
    handleEdite()
    event.preventDefault();

       
      }
  }
 
  const handleEdite=()=>{
    setTimeout(
       ()=>{

        }
        ,200
    )
      }
  //=====================validation=======================
  
const handleValidation=()=>{
    const {
      title,
      description,
      priority,
      startedAt,
      finishedAt,
    } = taskData;
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
    setTaskData({...taskData,[event.target.name]:event.target.value})
}
//==============================

    return (
      <>
        <Button variant="success"className='m-2' onClick={handleShow}>
            <AiFillEdit/>
        </Button>
  
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
           <div className="card ">
        <div className="card-header">
            <h3>Edite Task</h3>
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
            value={taskData.description} />
          </Form.Group>
          {/* ======================================================== */}
          <Form.Group className="mb-3">
            <Form.Label htmlFor="title">Title</Form.Label>
            <Form.Control id="title" 
            name="title"
            required
            maxLength="5"
            type="text"
            onChange={(event)=> handleChange(event)}
            value={taskData.title} />
          </Form.Group>
          {/* ======================================================== */}
          <Form.Group className="mb-3">
            <Form.Label htmlFor="startedAt">Start At</Form.Label>
            <Form.Control id="startedAt" 
            name="startedAt" 
            type="dateTime-local"
            onChange={(event)=> handleChange(event)}
            value={taskData.startedAt} />
          </Form.Group>
          {/* ======================================================== */}
          <Form.Group className="mb-3">
            <Form.Label htmlFor="finishedAt">Finished At</Form.Label>
            <Form.Control id="finishedAt" 
            name="finishedAt"
            type="dateTime-local"
            onChange={(event)=> handleChange(event)}
            value={taskData.finishedAt} />
          </Form.Group>
          {/* ======================================================== */}

          <Form.Group className="mb-3">
            <Form.Label htmlFor="priority">Priority</Form.Label>
            <Form.Select id="priority"
            name="priority"
            onChange={(event)=> handleChange(event)}
            value={taskData.priority}
            >
              <option value="Low" defaultValue="Low">
                Low
              </option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </Form.Select>
          </Form.Group>
          {/* ======================================================== */}

          <Form.Group className="mb-3">
            <Form.Label htmlFor="status">Status</Form.Label>
            <Form.Select id="status"
            name="status"
            onChange={(event)=> handleChange(event)}
            value={taskData.status}
            >
              <option value="Todo">
                Todo
              </option>
              <option value="InProgress">In progress</option>
              <option value="UnderReview">UnderReview</option>
              <option value="Rework">Rework</option>
              <option value="Completed">Completed</option>
            </Form.Select>
          </Form.Group>
          {/* ======================================================== */}


          <Modal.Footer>
          <Button type="submit">Submit</Button>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            
          </Modal.Footer>
        </fieldset>
      </Form>

    </div>
        </Modal>
      </>
    );
  }
  
    export default EditeTask;