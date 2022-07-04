import {useState} from 'react';
import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/Modal';
import {GrView} from 'react-icons/gr'
function TaskDetails({task}) {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
   //change date time form

    return (
      <>
        <Button variant="warning"className='m-2' onClick={handleShow}>
            <GrView/>
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
            <p>Description :{task.description}</p>
            <p>Priority :{task.priority} </p>
            <p>status :{task.status} </p>
            <p>started at :{task.startedAt.slice(0,10)} , {task.startedAt.slice(11)} </p>
            <p>finish at :{task.finishedAt.slice(0,10)} , {task.startedAt.slice(11)} </p>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
    export default TaskDetails;