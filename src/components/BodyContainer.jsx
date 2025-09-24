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
    <> 
      <NavBar />
      <div className="container mx-auto h-[200vh]">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default BodyContainer;
