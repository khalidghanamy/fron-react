import axios from 'axios';


const url = `${process.env.REACT_APP_SERVER_URL}/auth`;
const urlReset = `${process.env.REACT_APP_SERVER_URL}`;

export const login = async (loginData) => {
    try{
  const {data}= await axios.post(`${url}/login`,loginData);
 
  return data
}catch(error){
        
    return error.response.data
}
};
export const register = async(registrationData) => {
    try{

        const {data}= await axios.post(`${url}/signup`, registrationData)
        return data
    }catch(error){
        
        return error.response.data
    }
};

export const forgetPassword = async(email) => {
    try{

        const {data}= await axios.post(`${urlReset}/forget-password`, email)
        return data
    }catch(error){
        
        return error.response.data
    }
};

export const resetPassword = async(resetData) => {
    try{
//const link = `http://localhost:4000/reset-password/${user.id}/${token}`;
        
        const {data}= await axios.post(`${urlReset}/reset-password`, resetData)
        return data
    }catch(error){
        console.log(error);
        return error.response.data
    }
};