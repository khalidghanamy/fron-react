import { useState ,useEffect} from "react";
import Card from "react-bootstrap/Card";
import Task from "../Components/taskComponents/Task.component.jsx";
import useTasks from '../store/Task.js'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


const Tasks = ({tasks,taskStatus,setUpdateList,updateList,setTasksTest}) => {

const [filteredTasks, setFilteredTasks] = useState([]);



const CheckStatus = () => {
    
    const filteredTasks =tasks.filter(task => task.status === taskStatus);
    return filteredTasks;
}

useEffect(() => {
    setFilteredTasks(CheckStatus());
}
, [tasks, taskStatus]);

    

//     useEffect(() => {
//         setFilteredTasks(CheckStatus());
//     }
//    ,[tasks.length,updateList] ); 
    return ( 
        <>
            <Card className="p-0 m-5 w-100 h-100">
                <Card.Header>
                    <Card.Title className="d-flex justify-content-center"> {taskStatus} </Card.Title>
                </Card.Header>
            <Card.Body>
            <Droppable droppableId={taskStatus}>


          { (provided)=>(
            <div ref={provided.innerRef} {...provided.droppableProps} {...provided.dragHandleProps} >
          {filteredTasks.map((task,index) => (
                    
                <Task key={task.id} task={task} setUpdateList={setUpdateList} index={index} setTasksTest={setTasksTest} />

                ))}
                {provided.placeholder}
                </div>
                )}
                    </Droppable>
            </Card.Body>
                </Card>
        
        
        
        </>
     )
}

export default Tasks;