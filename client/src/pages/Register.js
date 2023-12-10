import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import styled from "styled-components";
import axios from "axios";

import { toastOptions } from "../ToastOptions";
import { TbTriangleInvertedFilled } from "react-icons/tb";

function Register() {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] =
    useState(false);
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  //   if there's a token(user logged in) they can not navigate to the register or login page
  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      navigate("/");
    }
  });

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  //   Form Validation
  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error(
        "Password and confirm password should be same.",
        toastOptions
      );
      return false;
    } else if (username.length < 3) {
      toast.error(
        "Username should be greater than 3 characters.",
        toastOptions
      );
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      if (handleValidation()) {
        const { email, username, password } = values;
        const res = await axios.post(
          "http://localhost:8000/api/auth/register",
          {
            username,
            email,
            password,
          }
        );
        if (res.data.status === true) {
          localStorage.setItem("authToken", res.data.token);
          navigate("/");
        }
      }
    } catch (error) {
      toast.error(error.response.data.msg, toastOptions);
    }
  };

  const showPassword = () => {
    setPasswordVisible(!passwordVisible);
  };
  const showConfirmPassword = () => {
    setConfirmPasswordVisibility(!confirmPasswordVisibility);
  };
  return (
    <>
      <FormContainer>
        <form action="" onSubmit={handleSubmit}>
          <div className="brand">
            <TbTriangleInvertedFilled />
            <h1>Ready!!!</h1>
          </div>
          <div className="form-input">
            {" "}
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="form-input">
            {" "}
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="form-input">
            {" "}
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              name="password"
              onChange={(e) => handleChange(e)}
            />
            {!passwordVisible ? (
              <VisibilityOffIcon onClick={showPassword} className="icon" />
            ) : (
              <VisibilityIcon onClick={showPassword} className="icon" />
            )}
          </div>
          <div className="form-input">
            {" "}
            <input
              type={confirmPasswordVisibility ? "text" : "password"}
              placeholder="Confirm Password"
              name="confirmPassword"
              onChange={(e) => handleChange(e)}
            />
            {!confirmPasswordVisibility ? (
              <VisibilityOffIcon
                onClick={showConfirmPassword}
                className="icon"
              />
            ) : (
              <VisibilityIcon onClick={showConfirmPassword} className="icon" />
            )}
          </div>

          <button type="submit">SignUp</button>
          <span>
            Already have an account ? <Link to="/login">Login</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}
const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #0d0c1e;

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    svg {
      color: #a21232;
      height: 3rem;
      width: 3rem;
    }
    h1 {
      color: #dece9c;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    background-color: #1a1831;
    border-radius: 2rem;
    padding: 3rem 5rem;
    .form-input {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 0.1rem solid #a21232;
      border-radius: 0.4rem;

      &:focus-within {
        border: 0.1rem solid #ff1232;
      }

      .icon {
        margin: 0.6rem;
        color: #a21232;
      }
    }
    input {
      width: 100%;
      padding: 1rem;
      background-color: transparent;
      border: none;
      color: white;
      font-size: 1rem;
      &:focus {
        outline: none;
        background-color: transparent;
      }
    }
    button {
      background-color: #a21232;
      color: white;
      padding: 1rem 2rem;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      text-transform: uppercase;
      &:hover {
        background-color: #ff1232;
      }
    }
    span {
      color: #dece9c;
      text-transform: uppercase;
    }
    a {
      color: #a21232;
      text-decoration: none;
      font-weight: bold;
      &:hover {
        color: #ff1232;
      }
    }
  }
`;
export default Register;
