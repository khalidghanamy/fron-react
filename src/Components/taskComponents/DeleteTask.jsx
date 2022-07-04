import {useState} from 'react';
import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/Modal';
import useTasks from '../../store/Task.js';
import {TbTrashOff} from 'react-icons/tb'
import {ToastContainer,toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
function DeleteTask({task}) {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
   const {deleteTask} = useTasks()
   const toastOption={
    position:"top-right",
    autoClose:8000,
    pauseOnHover:true,
    draggable:true,
    
    theme:"dark",
    
 }
   const handleDelete =async ()=>{

    const data = await deleteTask(task.id);
        console.log(data);
   if(data.status===false){
    console.log('fffffffffffffff');
       toast.error(data.msg,toastOption)}
        if(data.status===true){
          handleClose()          
        }

   }
    return (
      <>
        <Button variant="danger" className='m-2' onClick={handleShow}>
            <TbTrashOff/>
        </Button>
  
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Title :{task.title} </Modal.Title>
          </Modal.Header>
          <Modal.Body>
           <h2>
              Are you sure you want to delete this task?
           </h2>
          
          </Modal.Body>
          <Modal.Footer>
          <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
    export default DeleteTask;