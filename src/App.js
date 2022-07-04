import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AddTask from "./Components/taskComponents/AddTask.jsx";
import Tasks from "./Pages/Tasks";
import {BrowserRouter,Routes,Route} from "react-router-dom"

import { useEffect,useState } from "react";
import useTasks from "./store/Task.js";
import Home from "./Pages/Home";
import Register from "./Pages/Authentication/Register.jsx";
import Login from "./Pages/Authentication/Login.jsx";
import ForgetPassword from "./Components/AuthComponents/ForgetPassword.jsx";
import ResetPassword from "./Components/AuthComponents/ResetPassword.jsx";
import NotFound from "./Pages/NotFound.jsx";

function App() {

  return (
    <>
      <div className="App  d-flex justify-content-center">
       
      <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Home/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/forgetpassword" element={<ForgetPassword/>}/>
      <Route path="/resetpassword/:id/:token" element={<ResetPassword/>}/>
       {/* not found  */}
       <Route path="*" element={<NotFound/>}/>
    
     
    </Routes>
    </BrowserRouter>
        
      </div>
    </>
  );
}

export default App;
