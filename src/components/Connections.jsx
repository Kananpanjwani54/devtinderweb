// import React, { useEffect } from "react";
// import { BASE_URL } from "../utils/constants";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { addConnections } from "../utils/ConnectionsSlice";

// const Connections = () => {
//   const dispatch = useDispatch();
//   const connections = useSelector((store) => store.connections);

//   const fetchConnections = async () => {
//     try {
//       const res = await axios.get(BASE_URL + "/user/connections", {
//         withCredentials: true,
//       });
//       dispatch(addConnections(res.data.connections || []));
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchConnections();
//   }, []);

//   if (connections.length === 0)
//     return <h1 className="text-center mt-10 text-gray-500">No Connections Found</h1>;

//   return (
//     <div className="flex flex-col items-center my-10 px-4">
//       <h1 className="font-bold text-3xl mb-8 text-center">Connections</h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//         {connections.map((connection) => {
//           const { id, firstName, lastName, about, skills, profilePic, age, gender } = connection;

//           return (
//             <div
//               key={id || firstName + lastName}
//               className="bg-white shadow-lg rounded-xl p-5 flex flex-col items-center text-center transition-transform transform hover:scale-105 hover:shadow-2xl"
//             >
//               <img
//                 src={profilePic}
//                 alt={firstName + " " + lastName}
//                 className="w-28 h-28 rounded-full mb-4 border-2 border-blue-400"
//               />
//               <h2 className="font-semibold text-xl text-gray-900 mb-1">{firstName + " " + lastName}</h2>
//               <p className="text-gray-500 text-sm mb-2">{age} yrs | {gender}</p>
//               {about && <p className="text-gray-700 text-sm mb-2 truncate-text-2-lines">{about}</p>}
//               {skills && skills.length > 0 && (
//                 <p className="text-blue-500 text-sm font-medium">{skills.join(', ')}</p>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default Connections;
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/ConnectionsSlice";
import api from "../utils/api"; // 1. Use the custom 'api' instance

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);

  const fetchConnections = async () => {
    try {
      // 2. Use 'api.get' and remove BASE_URL and withCredentials
      const res = await api.get("/user/connections");
      dispatch(addConnections(res.data.connections || []));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections || connections.length === 0)
    return <h1 className="text-center mt-10 text-gray-500">No Connections Found</h1>;

  return (
    <div className="flex flex-col items-center my-10 px-4">
      <h1 className="font-bold text-3xl mb-8 text-center">Connections</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {connections.map((connection) => {
          const { id, firstName, lastName, about, skills, profilePic, age, gender } = connection;

          return (
            <div
              key={id || firstName + lastName}
              className="bg-white shadow-lg rounded-xl p-5 flex flex-col items-center text-center transition-transform transform hover:scale-105 hover:shadow-2xl"
            >
              <img
                src={profilePic}
                alt={firstName + " " + lastName}
                className="w-28 h-28 rounded-full mb-4 border-2 border-blue-400"
              />
              <h2 className="font-semibold text-xl text-gray-900 mb-1">{firstName + " " + lastName}</h2>
              <p className="text-gray-500 text-sm mb-2">{age} yrs | {gender}</p>
              {about && <p className="text-gray-700 text-sm mb-2 truncate-text-2-lines">{about}</p>}
              {skills && skills.length > 0 && (
                <p className="text-blue-500 text-sm font-medium">{skills.join(', ')}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;