// import React, { useEffect } from "react";
// import { Outlet, useNavigate } from "react-router-dom";
// import NavBar from "./NavBar";
// import Footer from "./Footer";
// import { useDispatch } from "react-redux";
// import { addUser } from "../utils/userSlice";
// import { BASE_URL } from "../utils/constants";
// import axios from "axios";


// const BodyContainer = () => {
//   const dispatch = useDispatch();
//   const Navigate=useNavigate();

//   // fetch the logged-in user's profile
//   const fetchUser = async () => {
//     try {
//       const user = await axios.get(BASE_URL + "/profile/profile/view", {
//         withCredentials: true,
//       });
//       // update the Redux store with user profile
//       dispatch(addUser(user.data));
//     } catch (err) {
//       //after the user logout or user is not valid means token invalid
//       if(err.response?.status===401){
//       Navigate("/login");
//     }else{
//       Navigate("/Error")
//     }
//       console.error("Error fetching user:", err.message);
//     }
//   };

//   useEffect(() => {
//     fetchUser();
//   }, []);
// return (
//     // 1. Replace the fragment with a div and add these classes
//     <div className="min-h-screen flex flex-col">
//       <NavBar />
      
//       {/* 2. Wrap the Outlet in a main tag with flex-grow */}
//       <main className="flex-grow">
//         <Outlet />
//       </main>
      
//       <Footer />
//     </div>
//   );
// };

// export default BodyContainer;
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import api from "../utils/api"; // Axios instance with BASE_URL & withCredentials

const BodyContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch logged-in user's profile
  const fetchUser = async () => {
    try {
      const response = await api.get("/profile/profile/view");
      dispatch(addUser(response.data)); // store user in Redux
    } catch (err) {
      if (err.response?.status === 401) {
        // unauthorized → redirect to login
        navigate("/login");
      } else {
        // other errors → redirect to error page
        navigate("/Error");
      }
      console.error("Error fetching user:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default BodyContainer;
