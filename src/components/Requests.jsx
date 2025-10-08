// import { useDispatch, useSelector } from "react-redux";
// import { BASE_URL } from "../utils/constants";
// import { addRequest, removeRequest } from "../utils/RequestSlice";
// import { useEffect, useState } from "react"; // Import useState
// import axios from "axios";

// // A simple loading component (you can replace this with a spinner)
// const LoadingSpinner = () => <div className="text-center mt-10">Loading...</div>;

// const Requests = () => {
//   const dispatch = useDispatch();
//   // Ensure your initial state in Redux is an empty array to make this cleaner
//   const requests = useSelector((store) => store.requests);
  
//   // --- IMPROVEMENT: Add loading and error states ---
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const reviewRequest = async (status, _id) => {
//     try {
//       await axios.post(
//         BASE_URL + "/requests/review/" + status + "/" + _id,
//         {},
//         { withCredentials: true }
//       );
//       // --- FIX: Dispatch only after successful API call ---
//       dispatch(removeRequest(_id));
//     } catch (err) {
//       console.log(err);
//       // You could use a toast notification library here
//       alert("Failed to review request. Please try again.");
//     }
//   };

//   const fetchRequests = async () => {
//     try {
//       const res = await axios.get(BASE_URL + "/user/request/received", {
//         withCredentials: true,
//       });
//       dispatch(addRequest(res.data.data || []));
//     } catch (err) {
//       console.log(err);
//       // --- IMPROVEMENT: Set an error message for the user ---
//       setError("Could not fetch requests. Please try again later.");
//     } finally {
//       // --- IMPROVEMENT: Stop loading state regardless of outcome ---
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchRequests();
//   }, []);

//   // --- IMPROVEMENT: Handle loading state ---
//   if (isLoading) return <LoadingSpinner />;
  
//   // --- IMPROVEMENT: Handle error state ---
//   if (error) return <h1 className="text-center mt-10 text-red-500">{error}</h1>;

//   if (requests.length === 0) {
//     return (
//       <h1 className="text-center mt-10 text-gray-500">No Request Found</h1>
//     );
//   }

//   return (
//     <div className="flex flex-col items-center my-10 px-4">
//       <h1 className="font-bold text-3xl mb-8 text-center">Requests received</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//         {requests.map((request) => {
//           const {
//             firstName,
//             lastName,
//             about,
//             skills,
//             profilePic,
//             age,
//             gender,
//           } = request.fromUserId;

//           return (
//             // --- FIX: Use the unique request ID for the key ---
//             <div
//               key={request._id}
//               className="bg-white shadow-lg rounded-xl p-5 flex flex-col items-center text-center"
//             >
//               <img
//                 src={profilePic}
//                 alt={`${firstName} ${lastName}`}
//                 className="w-28 h-28 rounded-full mb-4 border-2 border-blue-400"
//               />
//               <h2 className="font-semibold text-xl text-gray-900 mb-1">
//                 {`${firstName} ${lastName}`}
//               </h2>

//               <p className="text-gray-500 text-sm mb-2">
//                 {age} yrs | {gender}
//               </p>
//               {about && (
//                 <p className="text-gray-700 text-sm mb-2 truncate-text-2-lines">
//                   {about}
//                 </p>
//               )}
//               {skills && skills.length > 0 && (
//                 <p className="text-blue-500 text-sm font-medium">
//                   {skills.join(", ")}
//                 </p>
//               )}
//               <div className="flex mt-auto pt-4"> {/* Added mt-auto to push buttons down */}
//                 <button
//                   className="btn btn-outline btn-success mx-4"
//                   onClick={() => reviewRequest("accepted", request._id)}
//                 >
//                   Accept
//                 </button>
//                 <button
//                   className="btn btn-outline btn-error"
//                   onClick={() => reviewRequest("rejected", request._id)}
//                 >
//                   Reject
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default Requests;
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/RequestSlice";
import { useEffect, useState } from "react";
import api from "../utils/api"; // 1. Use the custom 'api' instance

// A simple loading component (you can replace this with a spinner)
const LoadingSpinner = () => <div className="text-center mt-10">Loading...</div>;

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const reviewRequest = async (status, _id) => {
    try {
      // 2. Use 'api.post' and remove BASE_URL and withCredentials
      await api.post(`/requests/review/${status}/${_id}`, {});
      dispatch(removeRequest(_id));
    } catch (err) {
      console.error("Failed to review request:", err);
      // Avoid using alert() in React applications
      setError("Failed to process the request. Please try again.");
    }
  };

  const fetchRequests = async () => {
    try {
      // 3. Use 'api.get' and remove BASE_URL and withCredentials
      const res = await api.get("/user/request/received");
      dispatch(addRequest(res.data.data || []));
    } catch (err) {
      console.error("Error fetching requests:", err);
      setError("Could not fetch requests. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Set initial state to an empty array if it's null
    if (requests === null) {
      fetchRequests();
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) return <LoadingSpinner />;
  
  if (error) return <h1 className="text-center mt-10 text-red-500">{error}</h1>;

  if (!requests || requests.length === 0) {
    return (
      <h1 className="text-center mt-10 text-gray-500">No Request Found</h1>
    );
  }

  return (
    <div className="flex flex-col items-center my-10 px-4">
      <h1 className="font-bold text-3xl mb-8 text-center">Requests received</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {requests.map((request) => {
          const {
            firstName,
            lastName,
            about,
            skills,
            profilePic,
            age,
            gender,
          } = request.fromUserId;

          return (
            <div
              key={request._id}
              className="bg-white shadow-lg rounded-xl p-5 flex flex-col items-center text-center"
            >
              <img
                src={profilePic}
                alt={`${firstName} ${lastName}`}
                className="w-28 h-28 rounded-full mb-4 border-2 border-blue-400"
              />
              <h2 className="font-semibold text-xl text-gray-900 mb-1">
                {`${firstName} ${lastName}`}
              </h2>

              <p className="text-gray-500 text-sm mb-2">
                {age} yrs | {gender}
              </p>
              {about && (
                <p className="text-gray-700 text-sm mb-2 truncate-text-2-lines">
                  {about}
                </p>
              )}
              {skills && skills.length > 0 && (
                <p className="text-blue-500 text-sm font-medium">
                  {skills.join(", ")}
                </p>
              )}
              <div className="flex mt-auto pt-4">
                <button
                  className="btn btn-outline btn-success mx-4"
                  onClick={() => reviewRequest("accepted", request._id)}
                >
                  Accept
                </button>
                <button
                  className="btn btn-outline btn-error"
                  onClick={() => reviewRequest("rejected", request._id)}
                >
                  Reject
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
