import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Logo from "../../assets/Logo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseUrl } from "../api";
import { useNavigate } from "react-router-dom";

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showLastName, setShowLastName] = useState(false);
  const [showUsername, setShowUsername] = useState(false);
  const [signUpData, setSignUpData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await baseUrl.post("user/register", signUpData);
      if (
        response.data &&
        response.data.message === "Registration successful"
      ) {
        toast("Registration successful");
        setSignUpData({
          firstName: "",
          lastName: "",
          username: "",
          password: "",
        });
        navigate("/login");
      } else {
        toast("Error posting data");
      }
    } catch (error) {
      toast.error("Error posting data");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignUpData({ ...signUpData, [name]: value });
  };

  const toggleVisibility = (field: string) => {
    if (field === "password") {
      setShowPassword(!showPassword);
    } else if (field === "lastName") {
      setShowLastName(!showLastName);
    } else if (field === "username") {
      setShowUsername(!showUsername);
    }
  };

  return (
    <div className="background">
      <div className="container">
        <div className="shadow card rounded p-5 w-75 mx-auto border-0">
          <div className="text-center mb-3">
            <img
              src={Logo}
              className="logo"
              width="120"
              height="60"
              alt="Pakam Logo"
            />
          </div>
          <form onSubmit={handleFormSubmit}>
            <h2 className="text-center fw-bold">Create Account</h2>
            <div className="row">
              <div className="col-lg-6">
                <div className="form-group mb-3">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your First Name"
                    required
                    name="firstName"
                    value={signUpData.firstName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group mb-3">
                  <label htmlFor="lastName">Last Name</label>
                  <div className="input-group border rounded">
                    <input
                      type={showLastName ? "text" : "password"}
                      className="form-control  border-0"
                      id="lastName"
                      placeholder="Enter your Last Name"
                      required
                      name="lastName"
                      value={signUpData.lastName}
                      onChange={handleInputChange}
                    />
                    <span
                      className="input-group-text border-0 bg-white"
                      onClick={() => toggleVisibility("lastName")}
                    >
                      {showLastName ? <FaEye /> : <FaEyeSlash />}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div className="form-group mb-3">
                  <label htmlFor="username">Username</label>
                  <div className="input-group border rounded">
                    <input
                      type={showUsername ? "text" : "password"}
                      className="form-control  border-0"
                      id="username"
                      placeholder="Enter your Username"
                      required
                      name="username"
                      value={signUpData.username}
                      onChange={handleInputChange}
                    />
                    <span
                      className="input-group-text border-0 bg-white"
                      onClick={() => toggleVisibility("username")}
                    >
                      {showUsername ? <FaEye /> : <FaEyeSlash />}
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group mb-3">
                  <label htmlFor="password">Password</label>
                  <div className="input-group border rounded">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control  border-0"
                      id="password"
                      placeholder="Enter your Password"
                      required
                      name="password"
                      value={signUpData.password}
                      onChange={handleInputChange}
                    />
                    <span
                      className="input-group-text border-0 bg-white"
                      onClick={() => toggleVisibility("password")}
                    >
                      {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center mb-3 mt-3">
              <button type="submit" className="btn custom-button w-50">
                Log In
              </button>
            </div>
          </form>
          <div>
            <p className="text-center">
              Forgot password?
              <span className="primary-color mx-3">Retrieve Now</span>
            </p>
          </div>
        </div>
        <p className="text-center text-success fw-bold mt-5">
          Powered by Pakam Technology
        </p>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default SignUp;
