import axios from 'axios';

const url = `${process.env.REACT_APP_SERVER_URL}/tasks`;

const getHeaders = () => {return {headers: {'Authorization': JSON.parse(localStorage.getItem("token"))}}}
export const getTasks = async (userId) => {
  const data= await axios.get(`${url}/read/${userId}`,getHeaders());
 
  return data 
};
export const createTask = async(newTask,userId) => {
  try {
    const data = await axios.post(`${url}/create/${userId}`,newTask,getHeaders());
    console.log(data);
    return data
  } catch (error) {
    error.status = error.response.status;
    return error.response
  }
};

export const updateTask = async(id, updateTask) => await axios.put(`${url}/${id}`, updateTask,getHeaders());

export const deleteTask =async (id) => await axios.delete(`${url}/${id}`,getHeaders());
export const getTask = (id) => axios.get(`${url}/${id}`);

