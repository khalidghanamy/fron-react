import AddTask from "../Components/taskComponents/AddTask.jsx";
import Tasks from "./Tasks";
import { useEffect,useState } from "react";
import useTasks from "../store/Task.js"
import NavBar from "../Components/NavBar.jsx";
import {useNavigate} from 'react-router-dom'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function Home() {
  const { tasks, getAllTasks,updateTask ,deleteTask,createTask} = useTasks();
  const [taskStatus, setTaskStatus] = useState(["Todo", "InProgress", "UnderReview", "Rework","Completed"]);
const navigate = useNavigate()  
const [user, setUser] = useState({});

const [tasksTest,setTasksTest]=useState(tasks)
const [updateList,setUpdateList]=useState(0)
useEffect(() => {
  async function getMe() {
    if (!localStorage.getItem("task-user")) {
      navigate("/login");
    }
    const user = JSON.parse(localStorage.getItem("task-user"));
    setUser(user);
    
     
  }
  getMe();
}, []);



const updateListStatus = async (newItem)=>{

  await updateTask(newItem.id,newItem);


}

const onDragEnd = async (result) => {
  console.log(result);
  if (!result.destination) {
    return;
  }

  
  
    const items =Array.from(tasksTest)
    const item=items[result.source.index]
    console.log(item);
    
     if (result.destination !== null ) {
      const newItem ={...item,status:result.destination.droppableId}
     
      await deleteTask(newItem.id);
      console.log(newItem);
      // await updateListStatus(newItem)
      const [removed] = removeFromList(items, result.source.index);
      const newItems = addToList(items, result.destination.index, removed);
      const [reOrderedItems] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reOrderedItems);
      console.log(items);
      console.log('done');
      setTasksTest(newItems);
      await createTask(newItem,user._id);
      setUpdateList(Math.random()*100);



    


}
};



useEffect(() => {
  (async () => {
    const user = JSON.parse(localStorage.getItem("task-user"));
    setUser(user);
  
     const data = await  getAllTasks(user._id);
    
     setTasksTest(data)
     }
     )();
 
  }, [tasks.length,updateList]);
  return (
    <>
        {<div className="container p-0 m-0">
          <div className="row">
          <NavBar/>
          </div>
          <div className="row mt-5 d-flex justify-content-center">
            <div className="mt-5 d-flex justify-content-center">
          <AddTask setUpdateList={setUpdateList}/>
          </div>
          </div>
          <DragDropContext onDragEnd={onDragEnd} >
          <div className="row" style={{marginRight:"5.1rem"}}>
           
          {
            taskStatus.map((task, index) => (
              
           
                <div className="col-lg-4 col-md-6 col-sm-12 mt-3" key={index}>
                  <Tasks tasks={tasksTest}  taskStatus={task} key={index} setUpdateList={setUpdateList} updateList={updateList}/>
                </div>
              
            ))
          }
    
            
           
            
          </div>
          </DragDropContext>
          
          
        </div>}
        
    </>
  );
}



const removeFromList = (list, index) => {
  console.log(Array.from(list));
  const result = list;
  const [removed] = result.splice(index, 1);
  return [removed, result];
};

const addToList = (list, index, element) => {
  const result = Array.from(list);
  result.splice(index, 0, element);
  return result;
};



export default Home;
