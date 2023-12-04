import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import API_URL from "../Axios/Axios";
export default function Register() {
  const [value, setValue] = useState({
    name: "",
    email: "",
    password: "",
    c_password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post(
      API_URL +"register",
      value
    );  

    const responseData = response.data;

    if (responseData.success) {
      toast.success("Registration Successful",)
      navigate("/login");
    } else {
      console.error("Registration Error:", responseData.message);

      // Display an error toast with the API error message
      toast.error(responseData.message || "Registration failed",)
    }
  } catch (error) {
    console.error("API Request Error:", error);

    // Display an error toast with the Axios error message
    toast.error(
      error.response?.data?.message || "An error occurred. Please try again later.",
    
    );
  }
};

  return (
      <>
      <ToastContainer
        position="top-right"
        autoClose="2000"
        hideProgressBar={false}
        pauseOnHover={true}
        draggable={true}
      ></ToastContainer>
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="tab-content">
              <div
                className="tab-pane fade show active"
                id="pills-register"
                role="tabpanel"
                aria-labelledby="tab-register"
              >
                <form onSubmit={handleSubmit}>
                  {/* Name Input */}
                  <label className="form-label" htmlFor="registerName">
                    Name
                  </label>
                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      id="registerName"
                      className="form-control"
                      placeholder="Enter your name"
                      name="name"
                      value={value.name}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Email Input */}
                  <label className="form-label" htmlFor="registerEmail">
                    Email
                  </label>
                  <div className="form-outline mb-4">
                    <input
                      type="email"
                      id="registerEmail"
                      className="form-control"
                      placeholder="Enter your email"
                      name="email"
                      value={value.email}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Password Input */}
                  <label className="form-label" htmlFor="registerPassword">
                    Password
                  </label>
                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      id="registerPassword"
                      className="form-control"
                      placeholder="Enter your password"
                      name="password"
                      value={value.password}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Repeat Password Input */}
                  <label
                    className="form-label"
                    htmlFor="registerRepeatPassword"
                  >
                    Repeat Password
                  </label>
                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      id="registerRepeatPassword"
                      className="form-control"
                      placeholder="Repeat your password"
                      name="c_password"
                      value={value.c_password}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Login Link */}
                  <div className="text-center">
                    <p>
                      Already a member?{" "}
                      <Link to="/login">
                        <span style={{ color: "blue" }}>Login</span>
                      </Link>
                    </p>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="btn btn-primary btn-block mb-3"
                  >
                    Sign up
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
