import axios from 'axios';

const url = `${process.env.REACT_APP_SERVER_URL}/tasks`;

export const getTasks = async (userId) => {
  const {data}= await axios.get(`${url}/read/${userId}`
  )
 
  return data.userTasks
};
export const createTask = async(newTask,userId) => {
  try {
    const data = await axios.post(`${url}/create/${userId}`, newTask)
    
    return data
    
  } catch (error) {
    return error.response.data
  }
};

export const updateTask = async(id, updateTask) => await axios.put(`${url}/${id}`, updateTask);

export const deleteTask =async (id) => await axios.delete(`${url}/${id}`);
export const getTask = (id) => axios.get(`${url}/${id}`);

