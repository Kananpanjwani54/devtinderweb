// import React from "react";
// import { useNavigate } from "react-router-dom";

// const Error = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-base-200 p-4">
      
//       {/* --- MINIMAL CHANGE STARTS HERE --- */}
//       <img
//         src="/error.png" // Assumes image is in your `public` folder
//         alt="Error Illustration"
//         className="h-48 w-auto mb-8" // Controls size and adds space below
//       />
//       {/* --- MINIMAL CHANGE ENDS HERE --- */}

//       <h1 className="text-4xl font-bold text-red-600 mb-4 text-center">
//         Something went wrong
//       </h1>
//       <p className="text-lg mb-6 text-center">
//         We couldn’t load your profile. Please try again later.
//       </p>
//       <button
//         className="btn btn-primary"
//         onClick={() => navigate("/")}
//       >
//         Go Home
//       </button>
//     </div>
//   );
// };

// export default Error;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Error = () => {
  const navigate = useNavigate();
  const [serverUp, setServerUp] = useState(false); // track if issue is resolved

  // Optionally, you can poll the server to check if it's back
  useEffect(() => {
    const interval = setInterval(() => {
      fetch("/api/health") // replace with a lightweight endpoint to check server
        .then((res) => {
          if (res.ok) setServerUp(true); // server is back
        })
        .catch(() => setServerUp(false)); // still down
    }, 5000); // check every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    if (serverUp) {
      navigate("/"); // server back → allow navigation
    } else {
      alert("Server is still down! Please try again later."); // stay here
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-base-200 p-4">
      <img src="/error.png" alt="Error" className="h-48 w-auto mb-8" />
      <h1 className="text-4xl font-bold text-red-600 mb-4 text-center">
        Something went wrong
      </h1>
      <p className="text-lg mb-6 text-center">
        Oops! The server is down or there was a problem. Please try again later.
      </p>
      <button className="btn btn-primary" onClick={handleClick}>
        Go Home
      </button>
    </div>
  );
};

export default Error;
