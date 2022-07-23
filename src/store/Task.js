import create from 'zustand';
import {getTasks, createTask,updateTask ,deleteTask,getTask} from '../Storage/api/taskApi.js'


const useTasks = create(set => ({
    tasks: [],
    task: {},
    getAllTasks: async (userId)=>{
        try{
            const {data} = await getTasks(userId);
            set(state => ({ tasks:data.userTasks}))
            return data

        }catch(error){
            return error.response.data
        }
    }
    ,
    createTask: async (newTask,userId) => {
        try{

        const {data} = await createTask(newTask,userId);
        
        set(state => ({ tasks: [...state.tasks, data]}))
        return data
        }catch(err){
            return  err.response.data
        }
    },
    updateTask: async (id, updatedData) => {
        try{

            const {data} = await updateTask(id, updatedData);
                    
            set(state => ({ tasks: state.tasks.filter(
                task =>  task.id === data.task_.id ? data.task : task)}))
            return data
         
        }catch(err){
            return err.response

        }
    }
    ,
    deleteTask: async (id) => {
        try{
            const {data}= await deleteTask(id);
            set(state => ({ tasks: state.tasks.filter(task => task.id !== id)}))
            return data
        }catch(err){
            return err.response.data
        }

    }
    ,
    getTask: async (id) => {
        const data = await getTask(id);
        set(state => ({ task: data}))

    }
    ,
    deleteOnDrag:  (id) => {
    
            set(state => ({ tasks: state.tasks.filter(task => task.id !== id)}))
        return;
    },
    updateOnDrag:  (id, updatedData) => {

        set(state => ({ tasks: state.tasks.filter(
            task =>  task.id === updatedData.id ? updatedData : task)}))
            return;
    }


    
}));


export default useTasks;