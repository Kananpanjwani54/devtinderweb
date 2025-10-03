import React, { useState } from "react";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);

  const handleAuth = async () => {
    if (userData) return;
    try {
      let res;
      if (isLoginForm) {
        // Login API
        res = await axios.post(
          BASE_URL + "/auth/login",
          { gmail: email, password },
          { withCredentials: true }
        );
      } else {
        // Signup API
        res = await axios.post(
          BASE_URL + "/auth/signup",
          { gmail: email, password, firstName, lastName, gender, age },
          { withCredentials: true }
        );
      }

      dispatch(addUser(res.data));
      navigate("/profile");
    } catch (err) {
      console.log("Auth error:", err);
      if (err.response?.data) {
        setError(err.response.data);
      } else {
        navigate("/error");
      }
    }
  };

  return (
    <div className="flex justify-center my-16">
      <div className="card bg-base-300 text-base-content w-96 shadow-2xl rounded-xl">
        <div className="card-body space-y-4">
          <h2 className="card-title text-center text-lg font-semibold justify-center">
            {isLoginForm ? "Login" : "Signup"}
          </h2>

          {/* Email Field with Icon */}
          <label
            htmlFor="email"
            className="input input-bordered flex items-center gap-2 bg-base-200 w-full"
          >
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

          {/* Password Field with Icon */}
          <label
            htmlFor="password"
            className="input input-bordered flex items-center gap-2 bg-base-200 w-full"
          >
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

          {/* Signup-only fields */}
          {!isLoginForm && (
            <>
              <input
                type="text"
                placeholder="First Name"
                className="input input-bordered w-full"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="input input-bordered w-full"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <select
                className="select select-bordered w-full"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="" disabled>
                  Select Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
              </select>
              <input
                type="number"
                placeholder="Enter Age (19-59)"
                className="input input-bordered w-full"
                value={age}
                onChange={(e) => {
                  const value = parseInt(e.target.value, 10);
                  if (value >= 19 && value <= 59) {
                    setAge(value);
                    setError("");
                  } else if (e.target.value === "") {
                    setAge("");
                    setError("");
                  } else {
                    setAge(e.target.value);
                    setError("Age must be between 19 and 59.");
                  }
                }}
              />
            </>
          )}

          {error && <p className="text-red-500">Error: {error}</p>}

          <div className="card-actions mt-4 justify-center">
            <button className="btn btn-primary" onClick={handleAuth}>
              {isLoginForm ? "Login" : "Signup"}
            </button>
          </div>

          {/* Toggle link */}
          <p className="text-center mt-2">
            {isLoginForm ? "New user?" : "Already have an account?"}{" "}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => setIsLoginForm(!isLoginForm)}
            >
              {isLoginForm ? "Signup here" : "Login here"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
