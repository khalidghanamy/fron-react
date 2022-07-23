import TaskDetails from "./ViewTask";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import EditeTask from "./EditTask";
import useTasks from "../../store/Task";
import DeleteTask from "./DeleteTask.jsx";
import Logout from "../AuthComponents/Logout.jsx";
import { Draggable } from 'react-beautiful-dnd';

const Task = ({task ,setUpdateList,index,setTasksTest}) => {
 

    return ( 
        <>
         <Draggable key={task.id} draggableId={task.id.toString()} index={index} >
                {(provided) => (
                    <div ref={provided.innerRef}
                     {...provided.draggableProps} 
                     {...provided.dragHandleProps}

                    >

            <Card className="container h-100"  >
         
                <div className="row align-items-center h-100" >
             
               <div className="col-4 ">
                    <Card.Title>{task.title}</Card.Title>
                    </div>
                <div className="row col-8 justify-content-evenly">
                
                
                    <div className="col-1 ">
                    <TaskDetails  task={task}/> 
                    </div>
                    <div className="col-1 ">
                    <EditeTask  task={task} setUpdateList={setUpdateList} setTasksTest={setTasksTest}/> 
                    </div>

                    <div className="col-1 ">
                    <DeleteTask task={task}/>
                    </div>
                    
                    </div>
                    </div>
                    
                
                
            </Card>
               
              
               </div>

               )}
   
   
               </Draggable>
        </>
     )
}

export default Task;