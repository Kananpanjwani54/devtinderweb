import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./navbar";
import Footer from "./footer";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
import axios from "axios";


const BodyContainer = () => {
  const dispatch = useDispatch();
  const Navigate=useNavigate();

  // fetch the logged-in user's profile
  const fetchUser = async () => {
    try {
      const user = await axios.get(BASE_URL + "/profile/profile/view", {
        withCredentials: true,
      });
      // update the Redux store with user profile
      dispatch(addUser(user.data));
    } catch (err) {
      //after the user logout or user is not valid means token invalid
      if(err.response?.status===401){
      Navigate("/login");
    }else{
      Navigate("/Error")
    }
      console.error("Error fetching user:", err.message);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
return (
    // 1. Replace the fragment with a div and add these classes
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      {/* 2. Wrap the Outlet in a main tag with flex-grow */}
      <main className="flex-grow">
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
};

export default BodyContainer;
