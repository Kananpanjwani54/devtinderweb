import React, { useState } from "react";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const dispatch = useDispatch();
  const navigate= useNavigate();
  const userData= useSelector((store) => store.user);
  

  // State variables
  const [email, setEmail] = useState("KananPanjwani10@gmail.com");
  const [password, setPassword] = useState("GoAT@12345");
  const [error,setError]=useState("")

  // Handle login API call
  const handleLogin = async () => {
    if (userData) return;
    try {
      const res = await axios.post(
        BASE_URL+"/auth/login",
        { gmail: email, password },
        { withCredentials: true }
      );

      dispatch(addUser(res.data));
      return navigate("/")
    } catch (err) {
      console.log("Login error:", err); 
      if(err.response?.data){
          setError(err.response.data);
      }else{
        navigate("/error")
      }
    }
  };

  return (
    <div className="flex justify-center my-16">
      <div className="card bg-base-300 text-base-content w-96 shadow-2xl rounded-xl">
        <div className="card-body space-y-4">
          <h2 className="card-title text-center text-lg font-semibold justify-center">
            Login
          </h2>

          {/* Email Field */}
          <label htmlFor="email" className="input input-bordered flex items-center gap-2 bg-base-200">
            <h3>Email:</h3>
            <svg
              className="h-5 w-5 opacity-70"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="20" height="16" x="2" y="4" rx="2"></rect>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
            </svg>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="mail@site.com"
              required
              className="grow"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          {/* Password Field */}
          <label htmlFor="password" className="input input-bordered flex items-center gap-2 bg-base-200">
            <h3>Password:</h3>
            <svg
              className="h-5 w-5 opacity-70"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
              <circle cx="16.5" cy="7.5" r=".5" />
            </svg>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              required
              minLength="8"
              className="grow"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          {/* Login Button */}
          {error && <p className="text-red-500">Error : {error}</p>}
          <div className="card-actions mt-4 justify-center">
            <button className="btn btn-primary w-full" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
