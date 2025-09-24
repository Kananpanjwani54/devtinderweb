import React from "react";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-base-200 p-4">
      
      {/* --- MINIMAL CHANGE STARTS HERE --- */}
      <img
        src="/error.png" // Assumes image is in your `public` folder
        alt="Error Illustration"
        className="h-48 w-auto mb-8" // Controls size and adds space below
      />
      {/* --- MINIMAL CHANGE ENDS HERE --- */}

      <h1 className="text-4xl font-bold text-red-600 mb-4 text-center">
        Something went wrong
      </h1>
      <p className="text-lg mb-6 text-center">
        We couldn’t load your profile. Please try again later.
      </p>
      <button
        className="btn btn-primary"
        onClick={() => navigate("/")}
      >
        Go Home
      </button>
    </div>
  );
};

export default Error;