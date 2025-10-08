import React, { useState, useEffect } from "react";
import SwipeCard from "./userCard";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user = {} }) => {
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [profilePic, setProfilePic] = useState(user.profilePic || "");
  const [age, setAge] = useState(user.age || "");
  const [about, setAbout] = useState(user.about || "");
  const [gender, setGender] = useState(user.gender || "");
  const [skills, setSkills] = useState(""); // will store as comma-separated string
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  //   const []
  const dispatch = useDispatch();

  // Convert array to comma-separated string on load
  useEffect(() => {
    if (Array.isArray(user.skills)) {
      setSkills(user.skills.join(", "));
    } else {
      setSkills(user.skills || "");
    }
  }, [user.skills]);

  const saveProfile = async () => {
    setError("");
    const skillsArray = skills
      ? skills
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s.length > 0)
      : [];
    try {
      // convert back to array
      console.log({
        firstName,
        lastName,
        profilePic,
        age,
        about,
        gender,
        skills: skillsArray, // save as array
      });
      // In a real app, make API call here
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          profilePic,
          age: Number(age),
          gender,
          about,
          skills: skillsArray,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(res?.data?.data));
      setMessage(res?.data?.message || "Profile updated successfully ✅");
      setTimeout(() => {
        setMessage("");
      }, 1000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center my-16 gap-10">
      <div className="flex justify-center mt-10">
        <div className="card bg-base-300 text-base-content w-96 shadow-2xl rounded-xl">
          <div className="card-body space-y-4">
            <h2 className="card-title text-center text-lg font-semibold justify-center">
              Edit Profile
            </h2>

            {profilePic && (
              <img
                src={profilePic}
                alt="Profile"
                className="w-24 h-24 mx-auto rounded-full object-cover"
              />
            )}

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
              type="text"
              placeholder="Profile Picture URL"
              className="input input-bordered w-full"
              value={profilePic}
              onChange={(e) => setProfilePic(e.target.value)}
            />

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

            {/* Skills input as comma-separated string */}

            <input
              type="text"
              placeholder="Skills (e.g., React, Node.js)"
              className="input input-bordered w-full"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />

            <textarea
              placeholder="About you"
              className="textarea textarea-bordered w-full"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />

            {error && (
              <p className="text-red-500 font-semibold">Error: {error}</p>
            )}
            {message && (
              <p className="text-green-600 font-semibold">{message}</p>
            )}
            {message && (
              <div className="toast toast-top toast-start">
                <div className="alert alert-success mt-14">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 shrink-0 stroke-current"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{message}</span>
                </div>
              </div>
            )}
            <div className="card-actions mt-4 justify-center">
              <button
                onClick={saveProfile}
                className="btn btn-primary w-full"
                disabled={!!error}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>

<div className="w-96 h-full flex-shrink-0">
      <SwipeCard 
        user={{
          firstName,
          lastName,
          age,
          skills: skills.split(",").map((s) => s.trim()), // pass as array
          profilePic,
          about,
          gender,
        }}
      />
    </div>
    </div>
  );
};

export default EditProfile;
