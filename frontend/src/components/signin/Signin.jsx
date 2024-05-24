import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./signin.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../../store";

const Signin = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:1000/api/v1/signin",
        inputs
      );
      if (response.data && response.data._id) {
        sessionStorage.setItem("id", response.data._id);
        console.log("User ID set in session storage:", response.data._id);
        dispatch(authActions.login());
        history("/todo");
      } else {
        alert("An error occurred while signing in.");
      }
    } catch (error) {
      console.error("Sign-in error:", error);
      alert("An error occurred while signing in.");
    }
  };

  return (
    <div className="main">
      <div className="signin-container">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
              value={inputs.email}
              onChange={handleChange}
              name="email"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
              value={inputs.password}
              onChange={handleChange}
              name="password"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Sign In
          </button>
        </form>
        <p className="mt-3">
          Don&apos;t have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
