import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { login } from "../../Storage/api/userApi.js";
import { forgetPassword } from "../../Storage/api/userApi.js";
const ForgetPassword = () => {
  const navigate = useNavigate();
  const [isMailSent, setIsMailSent] = useState(false);
  const [formEmail, setFormEmail] = useState({
    email: "",
  });

  useEffect(() => {
    if (localStorage.getItem("task-user")) {
      navigate("/home");
    }
  }, []);
  //============== toast handler ===============

  const toastOption = {
    position: "top-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,

    theme: "dark",
  };
  //=====================handle Submit=======================
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const data = await forgetPassword(formEmail);
      console.log(data);
      if (data.status === false) {
        toast.error(data.msg, toastOption);
      }
      if (data.status === true) {
        console.log(data.msg);
        setIsMailSent(true);
        console.log(isMailSent);
      }
    }
  };

  //=====================validation=======================

  const handleValidation = () => {
    const { email } = formEmail;

    if (email === "") {
      toast.error(" Email is required ", toastOption);
      return false;
    }
    return true;
  };

  const handleChange = (event) => {
    setFormEmail({ ...formEmail, [event.target.name]: event.target.value });
  };

  return (
    <>
      <div className="card mt-5">
        <div className="card-header">
          <h3>Forget password</h3>
        </div>
        {!isMailSent && (
          <Form onSubmit={(e) => handleSubmit(e)} className="card-body">
            <fieldset>
              {/* ======================================================== */}
              <Form.Group className="mb-3">
                <Form.Label htmlFor="email">Email</Form.Label>
                <Form.Control
                  id="email"
                  name="email"
                  required
                  type="email"
                  onChange={(event) => handleChange(event)}
                />
              </Form.Group>

              <div className="d-flex justify-content-center">
                <Button type="submit">Send reset link to your email </Button>
                <span className="m-2">
                  or <Link to="/login">Try login again</Link>
                </span>
              </div>
            </fieldset>
          </Form>
        )}
        {isMailSent && (
          <div className="card-header">
            <h3>Message sent successfully</h3>
            <h2>check your email</h2>
          </div>
        )}
      </div>
      <ToastContainer
        toastStyle={{ backgroundColor: "crimson" }}
      ></ToastContainer>
    </>
  );
};

export default ForgetPassword;
