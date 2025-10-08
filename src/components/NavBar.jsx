// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { BASE_URL } from "../utils/constants";
// import { removeUser } from "../utils/userSlice";

// const NavBar = () => {
//   const user = useSelector((store) => store.user);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//       await axios.post(BASE_URL + "/auth/logout", {}, { withCredentials: true });
//       dispatch(removeUser());
//       navigate("/login");
//     } catch (err) {
//       navigate("/error");
//     }
//   };

//   return (
//     <div className="navbar bg-base-200 shadow-sm">
//       <div className="flex-1">
//         <Link to="/" className="flex items-center gap-2">
//           <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
//           <h2 className="text-xl font-bold">DevConnect</h2>
//         </Link>
//       </div>

//       <div className="flex gap-2">
//         {user && (
//           <div className="dropdown dropdown-end flex">
//             <p className="px-4">Welcome, {user.firstName}</p>

//             <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
//               <div className="w-10 rounded-full">
//                 <img alt="Photo User" src={user.profilePic} />
//               </div>
//             </div>

//             <ul
//               tabIndex={0}
//               className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
//             >
//               <li>
//                 <Link to="/profile" className="justify-between">
//                   Profile
//                   <span className="badge">New</span>
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/requests">Requests</Link>
//               </li>
//               <li>
//                 <Link to="/Connections">Connections</Link>
//               </li>
//               <li>
//                 <a onClick={handleLogout}>Logout</a>
//               </li>
//             </ul>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default NavBar;
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api"; // 1. Use the custom 'api' instance
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // 2. Use 'api.post' and remove BASE_URL + withCredentials
      await api.post("/auth/logout", {});
      
      // 3. IMPORTANT: Remove the token from localStorage
      localStorage.removeItem('token');

      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      // Even if logout fails, clear local data and navigate to login
      localStorage.removeItem('token');
      dispatch(removeUser());
      navigate("/login");
    }
  };

  return (
    <div className="navbar bg-base-200 shadow-sm">
      <div className="flex-1">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
          <h2 className="text-xl font-bold">DevConnect</h2>
        </Link>
      </div>

      <div className="flex gap-2">
        {user && (
          <div className="dropdown dropdown-end flex">
            <p className="px-4">Welcome, {user.firstName}</p>

            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img alt="Photo User" src={user.profilePic} />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to="/requests">Requests</Link>
              </li>
              <li>
                <Link to="/Connections">Connections</Link>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;