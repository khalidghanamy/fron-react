import AddTask from "../Components/taskComponents/AddTask.jsx";
import Tasks from "./Tasks";
import { useEffect,useState } from "react";
import useTasks from "../store/Task.js"
import NavBar from "../Components/NavBar.jsx";
import {useNavigate} from 'react-router-dom'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function Home() {
  const { tasks, getAllTasks,updateTask ,deleteTask,createTask,getAllTasksNormal} = useTasks();
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


const tasksAsnd={
  Todo:0,
  InProgress:1,
  UnderReview:2,
  Rework:3,
  Completed:4

}



const onDragEnd = async (result) => {
  if (!result.destination) {
    return;
  }

  const items = tasksTest
  const item=items[result.source.index]
  console.log(tasksAsnd[item.status]);
  
   if (result.destination !== null ) {
    if(tasksAsnd[item.status]>tasksAsnd[result.destination.droppableId]){
      
      return;} 
    
   else {const newItem ={...item,status:result.destination.droppableId}
   
    await updateTask(newItem.id,newItem);  
    setUpdateList(Math.random()*100);}

}
};






useEffect(() => {
  (async () => {
    const user = JSON.parse(localStorage.getItem("task-user"));
    setUser(user);
    
      const data = await  getAllTasks(user._id);
        if (data.status) {
          console.log('ssssssssssssssssssssssss');
          setTasksTest(data.userTasks);
        }else{
          localStorage.removeItem("task-user");
          localStorage.removeItem("token");
           navigate("/login");  
        }

     }
     )();
 
  }, [tasks.length]);


  useEffect(() => {

    const dataNormal = getAllTasksNormal()
       
    console.log(dataNormal)
   setTasksTest(dataNormal)

  }
  , [tasks,updateList]);
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
          <DragDropContext 

          onDragEnd={onDragEnd} 

          >
          <div className="row" style={{marginRight:"6rem"}}>
           
          {
            taskStatus.map((task, index) => (
              
           
                <div className="col-lg-4 col-md-6 col-sm-12 mt-3 " key={index}>
                  <Tasks tasks={tasksTest}  taskStatus={task} key={index} setUpdateList={setUpdateList} updateList={updateList} setTasksTest={setTasksTest}/>
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